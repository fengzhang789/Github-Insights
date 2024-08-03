"use client";

import { useLoginMutation } from '@/app/__store/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';

type Props = {}

const Page = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt", "refreshJwt"]);  
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [login, result] = useLoginMutation();

  useEffect(() => {
    if (code) {
      login({ code });
    }
  }, [code, login]); // Only run effect if `code` or `login` changes

  useEffect(() => {
    if (!result.isUninitialized) {
      if (result.isSuccess && result.data.access_token && result.data.refresh_token) {
        setCookie("accessJwt", result.data.access_token);
        setCookie("refreshJwt", result.data.refresh_token);
      }
    }
  }, [result, setCookie]); // Only run effect if `result` or `setCookie` changes

  return (
    <div>
      logging in...
    </div>
  )
}

export default Page