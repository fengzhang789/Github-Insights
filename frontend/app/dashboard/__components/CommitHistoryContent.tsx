import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import CommitHistoryFileChange from "./CommitHistoryFileChange";
import Tag from "./Tag";
import axios from "axios";
import {
  CommitHistoryContentProps,
  ShaCommit,
  ShaCommitSummary,
  File,
  FileSummary,
} from "@/app/__typings/localtypes";
import CircularProgress from "@mui/material/CircularProgress";

import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

const CommitHistoryContent = ({
  SHA,
  owner,
  repo,
}: CommitHistoryContentProps) => {
  const [commit, setCommit] = useState<ShaCommit | null>(null);
  const [commitSummary, setCommitSummary] = useState<ShaCommitSummary | null>(
    null,
  );
  const [currentFile, setCurrentFile] = useState<FileSummary | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [cookies] = useCookies(["accessJwt"]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

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

  const getCommitSummary = () => {
    if (owner && repo && SHA) {
      axios
        .post(
          `http://localhost:5000/github/repository/commit/${SHA}/analysis`,
          {
            accessJwt: cookies.accessJwt,
            owner: owner,
            repo: repo,
          },
        )
        .then((response) => {
          setCommitSummary(response.data);
          console.log("get commit summary data: ", response);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching commit summary:", error);
          setIsLoading(false);
        });
    }
  };

  const getFileContent = () => {
    if (commit && currentFile) {
      axios
        .post("http://localhost:5000/github/raw-url/content", {
          rawURL: currentFile.raw_url,
        })
        .then((response) => {
          setFileContent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching file content:", error);
        });
    }
  };

  useEffect(() => {
    if (SHA) {
      console.log("update SHA");
      setIsLoading(true);
      getCommitInfo();
      getCommitSummary();
    }
  }, [SHA]);

  useEffect(() => {
    console.log("update currentFile");
    getFileContent();
  }, [currentFile]);

  const isCommitSummaryIncludesSlash = commitSummary?.tags.includes("///");

  return (
    <>
      {commitSummary && !isLoading ? (
        <>
          <div className="flex space-x-2 mb-4">
            <h1 className="text-4xl font-bold">
              {" "}
              {commitSummary.recommendedCommitMessage}
            </h1>
            <p className="text-gray-600">Branch: Main</p>
          </div>
          <div className="flex space-x-2 mb-[1rem]">
            {isCommitSummaryIncludesSlash &&
              commitSummary.tags
                .split("///")
                .map((tag, index) => <Tag text={tag} key={index} />)}
            {!isCommitSummaryIncludesSlash && <Tag text={"refactor"} />}
          </div>
          <div className="text-lg mb-[2rem]">
            <p>{commitSummary?.entireCommitAnalysis}</p>
          </div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold"> Files Changed </h1>
          </div>
          <div className="">
            <div className="flex space-x-4 mb-[3rem] overflow-x-auto scrollbar-thin">
              {commitSummary.files.map((file) => (
                <button
                  key={file.sha}
                  onClick={() => {
                    console.log("commit history file changed");
                    setCurrentFile(file);
                  }}
                  className=""
                >
                  <CommitHistoryFileChange
                    key={file.sha}
                    title={file.filename}
                    subtitle={`+${file.additions} -${file.deletions}`}
                    body={file.analysis.analysis}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-10 mt-10 flex justify-center items-center">
            {fileContent ? (
              <>
                <Editor
                  height="90vh"
                  defaultLanguage="typescript"
                  value={fileContent}
                  width="60vw"
                  theme="vs-dark"
                />
              </>
            ) : (
              <p>No file selected</p>
            )}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          {isLoading && <CircularProgress color="primary"></CircularProgress>}
          {!isLoading && <p className="text-center">Choose a commit</p>}
        </div>
      )}
    </>
  );
};

export default CommitHistoryContent;
