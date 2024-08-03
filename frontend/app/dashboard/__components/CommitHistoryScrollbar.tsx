import React from "react";
import styled from "styled-components";
import ScrollbarCard from "./ScrollbarCard";

type Commit = {
  name: string;
  user: string;
  time: string;
  message: string;
};

type CommitHistoryScrollBarProps = {
  commits: Commit[];
};

export default function CommitHistoryScrollBar({
  commits,
}: CommitHistoryScrollBarProps) {
  return (
    <ScrollContainer>
      {commits.map((commit, index) => (
        <CardWrapper key={index}>
          <ScrollbarCard commit={commit} />
        </CardWrapper>
      ))}
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const CardWrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;
