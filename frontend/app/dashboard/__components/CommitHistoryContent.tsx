import React from 'react';
import CommitHistoryFileChange from './CommitHistoryFileChange';

const CommitHistoryContent = (repo: any) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Commit Summary</h1>
        <p className="text-gray-600">Branch: Main</p>
      </div>
      <div className="mb-4">
        <p>Summary~~~~~ asjdfl;sajdfksajdf;asjdfl;kjasld;fja;lskdjf;laskdjfl;kasjdf;alsjkdf;askdjf;lasjdf;sdf</p>
      </div>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Files Changed</h1>
      </div>
      <div className="container mx-auto">
        <div className="flex space-x-2 mb-4 overflow-x-auto max-w-full">
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
          <CommitHistoryFileChange title="index.js" subtitle="+100, -28" body="change summary" />
        </div>
      </div>
      <div className="mb-4">
        <p>Code change square</p>
      </div>
    </>
  );
};

export default CommitHistoryContent;