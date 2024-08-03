import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

type Props = {}

const Page = (props: Props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button onClick={() => loginWithRedirect()}>CLICK ME TO LOGIN</button>
    </>
  )
}

export default Page