"use client";

import React from "react";
import styled from "styled-components";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon from react-icons
import { GradientBackground } from "@/app/__components/GradientBackground";
import { useGetUserRepositoriesQuery } from "../__store/api";

type Props = {};

const Page = (props: Props) => {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append(
    "client_id",
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? "",
  );
  url.searchParams.append("redirect_uri", "http://localhost:3000/login/github");

  const handleGitHubLogin = () => {
    window.location.href = url.toString();
  };

  return (
    <Container>
      <GradientBackgroundWrapper>
        <GradientBackground />
      </GradientBackgroundWrapper>
      <Content>
        <BoldHeader>
          Unlock your true <br />
          programming potential.
        </BoldHeader>
        <StyledButton onClick={handleGitHubLogin}>
          <FaGithub size={20} style={{ marginRight: "8px" }} />
          Sign up with GitHub
        </StyledButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const GradientBackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const BoldHeader = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  margin: 0; /* Remove margin to ensure proper centering */
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;

export default Page;
