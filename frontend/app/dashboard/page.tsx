"use client";
import * as React from "react";

import { useEffect, useState } from "react";
import CommitHistoryView from "./__components/CommitHistoryView";
import TopBar from "../__components/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../__store/store";
import { setView } from "../__store/viewSlice";
import { setSelectedRepo } from "../__store/repoSlice";
import axios from "axios";
import { useCookies } from "react-cookie";
import { TUserRepository } from "../__typings/api";
import { current } from "@reduxjs/toolkit";

export default function Dashboard() {
  const dispatch = useDispatch();

  const currentView = useSelector((state: RootState) => state.view.currentView);
  const repos = useSelector((state: RootState) => state.repo.RepoList);
  const [selectedRepository, setSelectedRepository] = useState(null);
  const [commitHistory, setCommitHistory] = useState(null);
  const [repoName, setRepoName] = useState(null);
  const [name, setName] = useState(null);
  const [cookies] = useCookies(["accessJwt"]);

  const handleClick = () => {
    console.log(selectedRepository);
    dispatch(setSelectedRepo(selectedRepository));
    dispatch(setView("project"));
    getRepoInfo();
  };

  const handleSelectChange = (event: any) => {
    const selectedRepo = repos.find((repo) => repo.name === event.target.value);
    setSelectedRepository(selectedRepo);
    setRepoName(selectedRepo["name"])
    setName(selectedRepo["owner"]["login"])
  };

  useEffect(() => {
    console.log(repos);
  }, []);
  const handleSelect = (e: any) => {
    setSelectedRepo(e.target.value);
  };

  const getRepoInfo = () => {
    console.log("abc123");
    if (selectedRepository) {
      // we need to see if the view is project view... this is not READY YET!!!!!!!
      console.log(selectedRepository["owner"]["login"]);
      console.log(selectedRepository["name"]);
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
          console.log("commit history:", formattedCommitHistory);
        })
        .catch((error) => {
          console.error("Error fetching commit history:", error);
        });
    }
  };

  return (
    <div>
      <TopBar />
      {currentView == null && (
        <div className="h-[80svh] grid place-items-center">
          <div className="text-center">
            <h1 className="text-5xl font-semibold">
              Select a Repository to Start.
            </h1>
            <div className="flex justify-center space-x-2 mt-4">
              <select
                onChange={handleSelectChange}
                className="w-[280px] text-black p-[9px] rounded-lg"
              >
                <option value="">Select a Project</option>
                {repos.map((repo, index) => (
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
        />
      )}
      {currentView == "feature" && "feature"}
      {currentView == "user" && "user"}
    </div>
  );
}
