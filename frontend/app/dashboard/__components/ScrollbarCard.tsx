import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollbarCardProps } from "@/app/__typings/localtypes";
import styled from "styled-components";

export default function ScrollbarCard({
  commit,
  setCommitSHA,
}: ScrollbarCardProps) {

  return (
    <StyledButton onClick={() => setCommitSHA(commit.sha)}>
      <Card className="max-w-[30svw] text-wrap break-words">
        <CardHeader>

          <CardTitle className="text-lg font-semibold truncate-multiline">
            Commit Message: {commit.message}
          </CardTitle>

          <div className="flex items-center mb-2">

            <Avatar src={commit.avatar} alt={`${commit.name}'s avatar`} />
            <span className="w-[80%] text-wrap break-words">
              <CardDescription className="text-sm text-gray-600">{commit.name}</CardDescription>
              <CardDescription className="text-sm text-wrap break-words text-gray-500">{commit.email}</CardDescription>
            </span>
          </div>
        </CardHeader>
        
        <CardFooter className="text-sm text-gray-500">
          Date: {commit.date} <br/>
          SHA: {commit.sha}
        </CardFooter>
      </Card>
    </StyledButton>
  );
}

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:focus {
    outline: none;
  }
`;
