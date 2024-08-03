import React from "react";
import styled from "styled-components";
import ScrollbarCard from "./ScrollbarCard";
import { CommitHistoryViewProps } from "@/app/__typings/localtypes";

export default function CommitHistoryScrollBar({
  commitHistory,
}: CommitHistoryViewProps) {
  return (
    <ScrollContainer>
      {commitHistory && commitHistory.length > 0 ? (
        commitHistory.map((commit, index) => (
          <CardWrapper key={index}>
            <ScrollbarCard commit={commit} />
          </CardWrapper>
        ))
      ) : (
        <NoCommitsText>No commits</NoCommitsText>
      )}
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

const NoCommitsText = styled.div`
  padding: 10px;
  text-align: center;
  color: #888;
`;
