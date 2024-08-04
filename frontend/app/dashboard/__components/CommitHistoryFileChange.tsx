import React from 'react';

interface CommitHistoryFileChangeProps {
  title: string;
  subtitle: string;
  body: string;
}

const CommitHistoryFileChange: React.FC<CommitHistoryFileChangeProps> = ({ title, subtitle, body }) => {
  // Split subtitle into parts
  const parts = subtitle.split(' ');

  // Check conditions and assign colors
  const x = parseInt(parts[0].substring(1));
  const y = parseInt(parts[1].substring(1));
  const isYGreater = y > x;

  const xColor = isYGreater ? 'text-green-400' : 'text-green-400'; // Always green for +x
  const yColor = isYGreater ? 'text-red-400' : 'text-red-400'; // Always red for -y

  return (
    <div className="border border-white rounded-lg p-2 my-2 bg-black min-w-64 max-w-64 min-h-52 max-h-52 overflow-y-hidden"> 
      <h1 className="text-sm mb-1 text-white text-wrap break-words">{title}</h1>
      <h2 className="text-xs mb-1">
        <span className={`${xColor}`}>{parts[0]}</span> <span className={`${yColor}`}>{parts[1]}</span>
      </h2>
      <p className="text-xs text-white break-words">{body}</p>
    </div>
  );
}

export default CommitHistoryFileChange;
