"use client";

import { useLoginMutation } from '@/app/__store/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

type Props = {}

const Page = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt"]);  
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [login, result] = useLoginMutation();
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    if (code) {
      login({ code });
    }
  }, [code, login]); // Only run effect if `code` or `login` changes

  useEffect(() => {
    if (!result.isUninitialized) {
      if (result.isSuccess && result.data.access_token) {
        setCookie("accessJwt", result.data.access_token);

        console.log("cookies set")
        // get user repositories
        axios.post('http://localhost:5000/github/user/repositories', {
          accessJwt: result.data.access_token,
        })
        .then(response => {
          setRepositories(response.data);
          console.log("user repositories set: ", repositories)
        })
        .catch(error => {
          console.error('Error fetching repositories:', error);
        });
      } else {
        console.log("not result.isSuccess && result.data.access_token")
        console.log("result.isSuccess: ", result.isSuccess)
        console.log("result.data: ",  result.data?.access_token)
        
      }
    }
  }, [result, setCookie]); // Only run effect if `result` or `setCookie` changes

  return (
    <div>
      <p>repositories: {repositories}</p>
    </div>
  )
}

export default Page