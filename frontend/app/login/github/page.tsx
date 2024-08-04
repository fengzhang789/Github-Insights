"use client";

import {
  useLoginMutation,
  useGetUserRepositoriesQuery,
} from "@/app/__store/api";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../__store/store";
import { setRepoList } from "../../__store/repoSlice";

type Props = {};

const PageContent = (props: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt"]);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (code) {
      login({ code });
    } else {
    }
  }, [code, login]); // Only run effect if `code` or `login` changes

  useEffect(() => {
    if (!result.isUninitialized) {
      if (result.isSuccess && result.data.access_token) {
        setCookie("accessJwt", result.data.access_token);
        console.log("cookies set", result.data.access_token);
        router.push("/dashboard");
      } else {
        console.log("not result.isSuccess && result.data.access_token");
        console.log("result.isSuccess: ", result.isSuccess);
        console.log("result.data: ", result.data?.access_token);
      }
    }
  }, [result, setCookie]); // Only run effect if `result` or `setCookie` changes

  return (
    <div>
      <p>Loading repositories...</p>
    </div>
  );
};

const Page = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent {...props} />
    </Suspense>
  );
};

export default Page;
