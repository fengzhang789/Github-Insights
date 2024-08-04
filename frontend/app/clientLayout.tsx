"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import ReduxProvider from "./__store/ReduxProvider";

type Props = {
  children: React.ReactNode;
};

const validPaths = ["/", "/login", "/login/github"];

const ClientLayout = (props: Props) => {
  const router = useRouter();
  const [cookies] = useCookies(["accessJwt"]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const token = cookies.accessJwt;

    if (!token && !validPaths.includes(currentPath)) {
      router.push("/login");
    }
  }, [cookies, router]);

  return <ReduxProvider>{props.children}</ReduxProvider>;
};

export default ClientLayout;
