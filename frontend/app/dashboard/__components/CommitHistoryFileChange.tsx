import React from 'react';

interface CommitHistoryFileChangeProps {
  title: string;
  subtitle: string;
  body: string;
}

const CommitHistoryFileChange: React.FC<CommitHistoryFileChangeProps> = ({ title, subtitle, body }) => {
  return (
    <div className="border border-white rounded-lg p-2 my-2 bg-black min-w-64 max-w-64"> 
      <h1 className="text-sm mb-1 text-white break-words">{title}</h1>
      <h2 className="text-xs mb-1 text-gray-400 break-words">{subtitle}</h2>
      <p className="text-xs text-white break-words">{body}</p>
    </div>
  );
}

export default CommitHistoryFileChange;