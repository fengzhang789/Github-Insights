import React from "react";

interface Commit {
  sha: string;
  message: string;
  name: string;
  avatar: string;
  email?: string;
  date?: string;
}

interface ScrollbarCardNewProps {
  commit: Commit;
}

const ScrollbarCardNew: React.FC<ScrollbarCardNewProps> = ({ commit }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={commit.avatar}
        alt={`${commit.name}'s avatar`}
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
      <div style={{ marginLeft: "10px", color: "black" }}>
        <p>
          <strong>{commit.name}</strong>
        </p>
        <p>{commit.message}</p>
        {commit.email && <p>Email: {commit.email}</p>}
        {commit.date && <p>Date: {commit.date}</p>}
      </div>
    </div>
  );
};

export default ScrollbarCardNew;
