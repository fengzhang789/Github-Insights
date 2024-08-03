import React from 'react'

type Props = {}

const Page = (props: Props) => {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append("client_id", process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "");
  url.searchParams.append("redirect_uri", "http://localhost:3000/login/github");

  return (
    <>
      <a href={url.toString()}>Sign up with GitHub</a>
    </>
  )
}

export default Page