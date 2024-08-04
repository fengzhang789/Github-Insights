// src/utils/fetchBranches.ts
export const fetchBranches = async (): Promise<{ [key: string]: string }> => {
    try {
      const response = await fetch(
        "http://localhost:5000/github/repository/branches",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: "fengzhang789",
            repo: "hackthe6ix",
            accessJwt: "ghu_WwbiJpfeXFR2CLDkdNPRf29H10BC9H0WC8HL",
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
  
  export const fetchCommitDetails = async (sha: string): Promise<any> => {
    try {
      const response = await fetch(
        "http://localhost:5000/github/repository/commits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            owner: "fengzhang789",
            repo: "hackthe6ix",
            accessJwt: "ghu_WwbiJpfeXFR2CLDkdNPRf29H10BC9H0WC8HL",
            sha: sha,
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
  
  export const fetchBranchDict = async (): Promise<{ [key: string]: any }> => {
    const branchData = await fetchBranches();
    const detailedBranchData = await Promise.all(
      Object.entries(branchData).map(async ([branchName, sha]) => {
        const commitDetails = await fetchCommitDetails(sha);
        return { branchName, commitDetails };
      }),
    );
  
    // Convert the array of results into an object
    const branchDict = detailedBranchData.reduce(
      (acc: { [key: string]: any }, item) => {
        acc[item.branchName] = item.commitDetails;
        return acc;
      },
      {},
    );
    return branchDict;
  };