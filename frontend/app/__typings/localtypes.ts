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
  name: string | null;
  repo: string | null;
};

export type CommitHistoryScrollbarProps = {
  commitHistory: Commit[] | null;
};

export interface ScrollbarCardProps {
  commit: Commit;
}

export type ShaCommit = {
  sha: string;
  commit: CommitDetails;
  url: string;
  files: File[];
};

export type File = {
  sha: string;
  filename: string;
  additions: number;
  deletions: number;
  changes: number;
  contents_url: string;
  raw_url: string;
}

export type CommitDetails = {
  author: User;
  commiter: User;
  message: string;
  url: string;
}

export type User = {
  name: string;
  email: string;
  date: string;
}
export type CommitHistoryContentProps = {
  SHA: string | null;
  owner: string | null;
  repo: string | null;
};