"use client";
import * as React from "react"
 
import { useEffect, useState } from "react";
import CommitHistoryView from './__components/CommitHistoryView';
import TopBar from "../__components/Topbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../__store/store";

import { TUserRepository } from "../__typings/api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const currentView = useSelector((state: RootState) => state.view.currentView);
  const repos = useSelector((state: RootState) => state.repo.RepoList);

  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleSelect = (e : any) => {
    setSelectedRepo(e.target.value)
  }
  useEffect(()=>{
    console.log(repos)
  }, [])

  return (
    <div>
      <TopBar />
      {currentView == null && 
        <div className="h-[80svh] grid place-items-center">
        <h1 className="text-5xl font-semibold text-center">
          Select a Repository to Start.
        </h1>
      <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a Project" />
      </SelectTrigger>
      <SelectContent>
        {repos.map((repo : any, index : number) => (
              <SelectItem key={index} value={repo}>
                {repo.name}
              </SelectItem>
            ))}
      </SelectContent>
    </Select>
        </div>
      }
      {currentView == 'project' &&
      'project'}
      {currentView == 'feature' &&
      'feature'}
      {currentView == 'user' &&
      'user'}
    </div>
  );
}
