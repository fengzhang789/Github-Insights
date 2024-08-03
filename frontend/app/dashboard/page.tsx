"use client";

import React from "react";
import CommitHistoryView from "./__components/CommitHistoryView";
import TopBar from "../__components/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../__store/store";

export default function Dashboard() {
  const currentView = useSelector((state: RootState) => state.view.currentView);

  return (
    <div>
      <TopBar />
      {currentView == null && (
        <div className="h-[80svh] grid place-items-center">
          <h1 className="text-5xl font-semibold text-center">
            Select a Repository to Start.
          </h1>
        </div>
      )}
      {currentView == "project" && "project"}
      {currentView == "feature" && "feature"}
      {currentView == "user" && "user"}
      <CommitHistoryView />
    </div>
  );
}
