"use client";

import { useLoginMutation, useGetUserRepositoriesQuery } from '@/app/__store/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react'
import { useCookies } from 'react-cookie';

type Props = {}

const PageContent = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["accessJwt"]);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [login, result] = useLoginMutation();
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const extractRepositoryNames = (repos) => {
    console.log("repo: ", repos)
    return repos.map(repo => repo.name);
  };

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

        //const {repos, isSuccess} = useGetUserRepositoriesQuery(result.data.access_token);

        console.log("cookies set", result.data.access_token)
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
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        console.log("not result.isSuccess && result.data.access_token")
        console.log("result.isSuccess: ", result.isSuccess)
        console.log("result.data: ", result.data?.access_token)

      }
    }
  }, [result, setCookie]); // Only run effect if `result` or `setCookie` changes

  return (
    <div>
      {isLoading ? (
        <p>Loading repositories...</p>
      ) : (
        <ul>
          {extractRepositoryNames(repositories).map((repo, index) => (
            <li key={index}>
              <button className="repo-button">
                {repo}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const Page = (props: Props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent {...props} />
    </Suspense>
  )
}

export default Page;