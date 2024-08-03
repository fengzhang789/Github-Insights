"use client";

import React, { ReactNode } from 'react'
import ReduxProvider from './__store/ReduxProvider';
import { Auth0Provider } from '@auth0/auth0-react';


type Props = {
  children: ReactNode
}

const ClientLayout = ({children}: Props) => {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
  const domainId = process.env.NEXT_PUBLIC_DOMAIN_ID;

  if (clientId == undefined || domainId == undefined || window == undefined) {
    return;
  }

  return (
    <Auth0Provider
      domain={domainId}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "127.0.0.1:3000"
      }}
    >
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </Auth0Provider>
    
  )
}

export default ClientLayout