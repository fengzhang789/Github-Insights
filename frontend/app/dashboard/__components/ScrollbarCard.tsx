import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Commit = {
  name: string;
  user: string;
  time: string;
  message: string;
};

type CommitHistoryScrollBarProps = {
  commit: Commit;
};

export default function ScrollbarCard({ commit }: CommitHistoryScrollBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{commit.name}</CardTitle>
        <CardDescription>{commit.user}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Commit Message: {commit.message}</p>
      </CardContent>
      <CardFooter>
        <p>Date Created: {commit.time}</p>{" "}
        {/* we will need to change this to make it look nicer */}
      </CardFooter>
    </Card>
  );
}
