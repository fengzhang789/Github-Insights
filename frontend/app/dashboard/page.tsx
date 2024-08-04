"use client";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import TopBar from "../__components/Topbar";
import { useGetUserRepositoriesQuery } from "../__store/api";
import { RootState } from "../__store/store";
import { setView } from "../__store/viewSlice";
import { TUserRepository } from "../__typings/api";
import CommitHistoryView from "./__components/CommitHistoryView";
import Feature from "./__components/Feature";

export default function Dashboard() {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.view.currentView);
  const [selectedRepository, setSelectedRepository] =
    useState<TUserRepository | null>(null);
  const [commitHistory, setCommitHistory] = useState(null);
  const [repoName, setRepoName] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [cookies] = useCookies(["accessJwt"]);
  const { data: repos, isSuccess } = useGetUserRepositoriesQuery({
    accessJwt: cookies.accessJwt,
  });

  const [userList, setUserList] = useState<Array<string>>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleClick = () => {
    setSelectedRepository(selectedRepository);
    getRepoInfo();
    dispatch(setView("project"));
  };

  const handleSelectChange = (event: any) => {
    const selectedRepo = repos?.find(
      (repo) => repo.name === event.target.value,
    );

    if (selectedRepo) {
      setSelectedRepository(selectedRepo);
      setRepoName(selectedRepo["name"]);
      setName(selectedRepo["owner"]["login"]);
    }
  };

  const getRepoInfo = () => {
    if (selectedRepository) {
      axios
        .post("http://localhost:5000/github/repository/commits", {
          owner: selectedRepository["owner"]["login"],
          repo: selectedRepository["name"],
          accessJwt: cookies.accessJwt,
        })
        .then((response) => {
          const formattedCommitHistory = response.data.map((commit: any) => ({
            name: commit.commit.author.name,
            email: commit.commit.author.email,
            date: commit.commit.author.date,
            message: commit.commit.message,
            sha: commit.sha,
            avatar: commit.author.avatar_url,
          }));
          setCommitHistory(formattedCommitHistory);

          // Extract unique users
          const uniqueUsers = Array.from(
            new Set(
              response.data.map((commit: any) => commit.commit.author.name),
            ),
          );
          setUserList(uniqueUsers as string[]);

          console.log("commit history:", formattedCommitHistory);
          console.log("unique users:", uniqueUsers);
        })
        .catch((error) => {
          console.error("Error fetching commit history:", error);
        });
    }
  };

  if (repos == null) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <TopBar users={userList} setUser={setSelectedUser} />
      {currentView == null && (
        <div className="h-[80svh] grid place-items-center">
          <div className="text-center">
            <h1 className="text-5xl font-semibold">
              Select a Repository to Start.
            </h1>
            <div className="flex justify-center space-x-2 mt-4">
              <select
                onChange={handleSelectChange}
                className="w-[280px] text-black p-[9px] rounded-lg bg-white"
              >
                <option value="">Select a Project</option>
                {repos != null &&
                  repos.map((repo, index) => (
                    <option key={index} value={repo.name}>
                      {repo.name}
                    </option>
                  ))}
              </select>
              <button
                onClick={handleClick}
                className="text-black bg-white p-[9px] font-extrabold rounded-lg"
              >
                GO
              </button>
            </div>
          </div>
        </div>
      )}
      {currentView == "project" && (
        <CommitHistoryView
          commitHistory={commitHistory}
          name={name}
          repo={repoName}
          selectedUser={selectedUser}
        />
      )}
      {currentView == "feature" && (
        <Feature name={name} repo={repoName} cookie={cookies["accessJwt"]} />
      )}
    </div>
  );
}
