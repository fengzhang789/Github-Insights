import React from "react";
import styled from "styled-components";
import ScrollbarCard from "./ScrollbarCard";
import { CommitHistoryScrollbarProps } from "@/app/__typings/localtypes";

export default function CommitHistoryScrollBar({
  commitHistory,
  setCommitSHA,
}: CommitHistoryScrollbarProps) {
  return (
    <ScrollContainer>
      {commitHistory && commitHistory.length > 0 ? (
        commitHistory.map((commit, index) => (
          <CardWrapper key={index}>
            <ScrollbarCard commit={commit} setCommitSHA={setCommitSHA} />
          </CardWrapper>
        ))
      ) : (
        <NoCommitsText>No commits</NoCommitsText>
      )}
    </ScrollContainer>
  );
}

const ScrollContainer = styled.div`
  height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 30svw;

/* WebKit browsers */
  &::-webkit-scrollbar {
    width: 8px; /* Adjust width as needed */
  }

  &::-webkit-scrollbar-track {
    background: transparent; /* No background for track */
  }

  &::-webkit-scrollbar-thumb {
    background: white; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Optional: rounded corners for the thumb */
  }

  /* Firefox */
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color: white transparent; /* Thumb color and track color */
`;

const CardWrapper = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`;

const NoCommitsText = styled.div`
  padding: 10px;
  text-align: center;
  color: #888;
`;
