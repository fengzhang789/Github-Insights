import React, {useState} from "react";
import CommitHistoryScrollbar from "./CommitHistoryScrollbar";
import CommitHistoryContent from "./CommitHistoryContent";

type Commit = {
  name: string;
  user: string;
  time: string;
  message: string;
};

type CommitHistoryScrollBarProps = {
  commits: Commit[];
};

const commits: Commit[] = [
  {
    name: "Commit 1",
    user: "User 1",
    time: "2021-09-01 10:00:00",
    message: "Initial commit",
  },
  {
    name: "Commit 2",
    user: "User 2",
    time: "2021-09-02 14:30:00",
    message: "Added feature A",
  },
  {
    name: "Commit 3",
    user: "User 1",
    time: "2021-09-03 09:45:00",
    message: "Fixed bug B",
  },
];

const CommitHistoryView = () => {
  const [SHA, setSHA] = useState('');

  return (
    <div className="flex">
      <div className="flex-1 basis-1/4">
        <CommitHistoryScrollbar commits={commits} />
      </div>
      <div className="flex-1 basis-3/4 px-10 py-6">
        <CommitHistoryContent SHA={SHA} />
      </div>
    </div>
  );
};

export default CommitHistoryView;
