// src/utils/fetchBranchData.ts
import axios from "axios";

const fetchBranches = async (
  owner: string | null,
  repo: string | null,
  accessJwt: string | null,
): Promise<{ [key: string]: string }> => {
  try {
    const response = await fetch(
      "http://localhost:5000/github/repository/branches",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner,
          repo,
          accessJwt,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Parse the data into the desired dictionary format
    const branchDict = data.reduce(
      (acc: { [key: string]: string }, branch: any) => {
        acc[branch.name] = branch.commit.sha;
        return acc;
      },
      {},
    );

    return branchDict;
  } catch (error) {
    console.error("Error fetching branches:", error);
    return {};
  }
};

const fetchCommitDetails = async (
  owner: string | null,
  repo: string | null,
  accessJwt: string | null,
  sha: string,
): Promise<any> => {
  try {
    const response = await fetch(
      "http://localhost:5000/github/repository/commits",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner,
          repo,
          accessJwt,
          sha,
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const commitData = await response.json();
    // Extract only the necessary fields
    const simplifiedData = commitData.map((commit: any) => ({
      sha: commit.sha,
      author: commit.commit.author.name,
      message: commit.commit.message,
      date: commit.commit.author.date,
    }));

    return simplifiedData;
  } catch (error) {
    console.error("Error fetching commit details:", error);
    return {};
  }
};

const fetchBranchDict = async (
  owner: string | null,
  repo: string | null,
  accessJwt: string | null,
): Promise<{ [key: string]: any }> => {
  const branchData = await fetchBranches(owner, repo, accessJwt);
  const detailedBranchData = await Promise.all(
    Object.entries(branchData).map(async ([branchName, sha]) => {
      const commitDetails = await fetchCommitDetails(
        owner,
        repo,
        accessJwt,
        sha,
      );
      return { branchName, commitDetails };
    }),
  );

  // Convert the array of results into an object and reverse each array of commit details
  const branchDict = detailedBranchData.reduce(
    (acc: { [key: string]: any }, item) => {
      acc[item.branchName] = item.commitDetails.reverse();
      return acc;
    },
    {},
  );
  return branchDict;
};

export const fetchBranchData = async (
  owner: string | null,
  repo: string | null,
  accessJwt: string | null,
): Promise<{ name: string; commits: any[] }[]> => {
  const branchData = await fetchBranchDict(owner, repo, accessJwt);

  // Merge all commit dictionaries into one array
  const allCommits = Object.values(branchData).flat();

  // Remove duplicate commits based on sha
  const uniqueCommits = Array.from(
    new Map(allCommits.map((commit: any) => [commit.sha, commit])).values(),
  );

  // Sort the array by date
  uniqueCommits.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  // Apply the ID scheme
  const shaToIdMap = uniqueCommits.reduce(
    (acc, commit, index) => {
      acc[commit.sha] = index + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  // Update the original branch data with the new IDs
  const updatedBranchArray = Object.entries(branchData).map(
    ([branchName, commits]) => ({
      name: branchName,
      commits: commits.map((commit: any) => ({
        ...commit,
        id: shaToIdMap[commit.sha] || null,
      })),
    }),
  );

  return updatedBranchArray;
};
