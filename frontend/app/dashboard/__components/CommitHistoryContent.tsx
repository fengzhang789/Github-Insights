import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CommitHistoryFileChange from "./CommitHistoryFileChange";
import axios from "axios";
import {
  CommitHistoryContentProps,
  ShaCommit,
} from "@/app/__typings/localtypes";

const CommitHistoryContent = ({
  SHA,
  owner,
  repo,
}: CommitHistoryContentProps) => {
  const [commit, setCommit] = useState<ShaCommit | null>(null);
  const [cookies] = useCookies(["accessJwt"]);

  const getCommitInfo = () => {
    if (owner && repo && SHA) {
      axios
        .post(`http://localhost:5000/github/repository/commit/${SHA}`, {
          accessJwt: cookies.accessJwt,
          owner: owner,
          repo: repo,
        })
        .then((response) => {
          setCommit(response.data);
          console.log("response data: ", response);
        })
        .catch((error) => {
          console.error("Error fetching commit:", error);
        });
    }
  };

  useEffect(() => {
    console.log("hello");
    getCommitInfo();
  }, [SHA]);

  return (
    <>
      {commit ? (
        <>
          <div className="flex justify-between items-center mb-4 max-w-[70svw]">
            <h1 className="text-4xl font-bold">Commit Summary</h1>
            <p className="text-gray-600">Branch: Main</p>
          </div>
          <div className="text-lg mb-[3rem]">
            <p>
              Summary~~~~~
              asjdfl;sajdfksajdf;asjdfl;kjasld;fja;lskdjf;laskdjfl;kasjdf;alsjkdf;askdjf;lasjdf;sdf
            </p>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold"> Files Changed </h1>
          </div>
          <div className="max-w-[70svw]">
            <div className="flex space-x-4 mb-[3rem] overflow-x-auto scrollbar-thin max-w-[70svw]">
              {commit.files.map((file) => (
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
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-center">Choose a commit</p>
        </div>
      )}
    </>
  );
};

export default CommitHistoryContent;
