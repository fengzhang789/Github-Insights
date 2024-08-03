import React, { useState, useEffect } from 'react';
import { useCookies } from "react-cookie";
import CommitHistoryFileChange from './CommitHistoryFileChange';
import axios from 'axios';

type Commit = {
  sha: string;
  commit: CommitDetails;
  url: string;
  files: File[];
};

type File = {
  sha: string;
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
  contents_url: string;
  raw_url: string;
}

type CommitDetails = {
  author: User;
  commiter: User;
  message: string;
  url: string;
}

type User = {
  name: string;
  email: string;
  date: string;
}
type CommitHistoryContentProps = {
  SHA: string;
  owner: string;
  repo: string;
};

const CommitHistoryContent = ({ SHA, owner, repo }: CommitHistoryContentProps) => { 
  const [commit, setCommit] = useState<Commit | null>(null);
  const [cookies] = useCookies(["accessJwt"]);

  useEffect(() => {
    axios.post(`http://localhost:5000/github/repository/commit/${SHA}`, {
      accessJwt: cookies.accessJwt,
      owner: owner,
      repo: repo,
    }).then((response) => {
      setCommit(response.data);
      console.log("response data: ", response);
    }).catch((error) => {
      console.error("Error fetching commit:", error);
    });
  }, [SHA]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Commit Summary</h1>
        <p className="text-gray-600">Branch: Main</p>
      </div>
      <div className="mb-4">
        <p>Summary~~~~~ asjdfl;sajdfksajdf;asjdfl;kjasld;fja;lskdjf;laskdjfl;kasjdf;alsjkdf;askdjf;lasjdf;sdf</p>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Files Changed</h1>
      </div>
      <div className="container max-w-3/4">
        <div className="flex space-x-2 mb-4 overflow-x-auto max-w-full">
          {commit && commit.files && commit.files.map(file => (
            <CommitHistoryFileChange
              key={file.sha}
              title={file.filename}
              subtitle={`+${file.additions} -${file.deletions}`}
              body={file.raw_url}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p>Code change square</p>
      </div>
    </>
  );
};

export default CommitHistoryContent;