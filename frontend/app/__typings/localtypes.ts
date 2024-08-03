export type Commit = {
  name: string;
  email: string;
  date: string;
  message: string;
  sha: string;
  avatar: string;
};

export type CommitHistoryViewProps = {
  commitHistory: Commit[] | null;
};

export type CommitHistoryScrollbarProps = {
  commitHistory: Commit[] | null;
  setCommitSHA: (sha: string | null) => void;
};

export type CommitHistoryContentProps = {
  commitHistory: Commit[] | null;
  commitSHA: string | null;
};

export interface ScrollbarCardProps {
  commit: Commit;
  setCommitSHA: (sha: string | null) => void;
}
