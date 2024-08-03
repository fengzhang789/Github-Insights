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
    <Button onClick={() => setCommitSHA(commit.sha)}>
      <Card>
        <CardHeader>
          <Avatar src={commit.avatar} alt={`${commit.name}'s avatar`} />
          <CardTitle>{commit.sha}</CardTitle>
          <CardDescription>{commit.name}</CardDescription>
          <CardDescription>{commit.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Commit Message: {commit.message}</p>
        </CardContent>
        <CardFooter>
          <p>Date Created: {commit.date}</p>{" "}
        </CardFooter>
      </Card>
    </Button>
  );
}

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Button = styled.button`
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
