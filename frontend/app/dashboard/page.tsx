"use client";

import React from "react";
import TopBar from "../__components/Topbar";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../__store/store";

export default function Dashboard() {

  const currentView = useSelector((state: RootState) => state.view.currentView);

  return (
    <div>
      <TopBar/>
      {currentView == 'project' &&
      'project'}
      {currentView == 'feature' &&
      'feature'}
      {currentView == 'user' &&
      'user'}
    </div>
  );
}
