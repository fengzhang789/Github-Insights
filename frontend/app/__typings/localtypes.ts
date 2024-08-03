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

export interface ScrollbarCardProps {
  commit: Commit;
}
