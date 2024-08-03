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

export default function ScrollbarCard({ commit }: ScrollbarCardProps) {
  return (
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
  );
}

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;
