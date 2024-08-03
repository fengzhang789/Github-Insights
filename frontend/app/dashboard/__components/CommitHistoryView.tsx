import React from 'react';
import CommitHistoryScrollbar from './CommitHistoryScrollbar';
import CommitHistoryContent from './CommitHistoryContent';

const CommitHistoryView = (repo: any) => {
  return (
    <div className="flex">
      <div className="flex-1 basis-1/4">
        <CommitHistoryScrollbar repo={repo} />
      </div>
      <div className="flex-1 basis-3/4 px-10 py-6">
        <CommitHistoryContent repo={repo} />
      </div>
    </div>
  );
}

export default CommitHistoryView;
