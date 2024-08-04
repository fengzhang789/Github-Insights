import React, { useState, useEffect, use } from "react";
import CommitHistoryScrollbar from "./CommitHistoryScrollbar";
import CommitHistoryContent from "./CommitHistoryContent";
import AddTagBar from "./AddTagBar";
import { CommitHistoryViewProps } from "@/app/__typings/localtypes";

const CommitHistoryView: React.FC<CommitHistoryViewProps> = ({
  commitHistory,
  repo,
  name,
  selectedUser
}) => {
  const [commitSHA, setCommitSHA] = useState<string | null>(null);

  useEffect(() => {
    console.log(commitSHA);
  }, [commitSHA]);

  return (
    <div className="flex">
      <div className="flex-1 basis-1/4">
        <CommitHistoryScrollbar
          commitHistory={commitHistory}
          setCommitSHA={setCommitSHA}
          selectedUser={selectedUser}
        />
      </div>
      <div className="flex-1 basis-3/4 px-10 py-6 max-w-[70svw]">
        {commitSHA ? (
          <div>
            <div className = "mb-4">
              <AddTagBar repo={repo}/>
            </div>
            <CommitHistoryContent SHA={commitSHA} repo={repo} owner={name} />
          </div>
        ) : (
          <CommitHistoryContent SHA={commitSHA} repo={repo} owner={name} />
        )
        }
      </div>
    </div>
  );
};

export default CommitHistoryView;
