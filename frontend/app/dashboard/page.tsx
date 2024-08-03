"use client";
import * as React from "react";

import { useEffect, useState } from "react";
import CommitHistoryView from "./__components/CommitHistoryView";
import TopBar from "../__components/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../__store/store";
import { setSelectedRepo } from "../__store/repoSlice";
import { setView } from "../__store/viewSlice";
import { TUserRepository } from "../__typings/api";

export default function Dashboard() {
  const dispatch = useDispatch();

  const currentView = useSelector((state: RootState) => state.view.currentView);
  const repos = useSelector((state: RootState) => state.repo.RepoList);

  const [selectedRepository, setSelectedRepository] = useState(null);

  const handleClick = () => {
    console.log(selectedRepository);
    dispatch(setSelectedRepo(selectedRepository));
    dispatch(setView('project'))
  };

  const handleSelectChange = (event: any) => {
    const selectedRepo = repos.find(repo => repo.name === event.target.value);
    setSelectedRepository(selectedRepo);
  };

  useEffect(() => {
    console.log(repos);
  }, []);

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
      {currentView == "project" && "project"}
      {currentView == "feature" && "feature"}
      {currentView == "user" && "user"}
    </div>
  );
}