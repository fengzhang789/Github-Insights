"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavigationMenuDemo } from "@/app/__components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CodeDemo from "@/public/CodeDemo.png";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <NavBar className={isScrolled ? "scrolled" : ""}>
        <NavigationMenuDemo />
        <NavBarButton variant={isScrolled ? "outline" : "default"}>
          Get Started
        </NavBarButton>
      </NavBar>
      <ContentContainer>
        <BoldHeader>
          Visualize, Understand, Simplify: <br />
          <span>
            Your Commits, <GradientHeader>Reimagined.</GradientHeader>
          </span>
        </BoldHeader>
        <StyledButton>Get Started with GitInsights &gt;</StyledButton>
      </ContentContainer>
      <StyledImage src={CodeDemo} alt="Example" />
      <LeftAlignedContainer>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>
          Understand Commits from a <br />
        </h1>

        <GradientHeader>Different Persepctive.</GradientHeader>
        <StyledBox>
          <CatchyText>
            AI-powered commit histories, summarized so you know where to look
          </CatchyText>
        </StyledBox>
      </LeftAlignedContainer>
    </div>
  );
}

const NavBar = styled.div`
  height: 100px; // Adjust the height value as needed
  background-color: #000000; // Black background color
  display: flex;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  transition: background-color 0.3s ease;
  padding: 0 30px; // Add horizontal padding

  &.scrolled {
    background-color: rgba(0, 0, 0, 0.8); // Translucent black background
  }
`;

const ContentContainer = styled.div`
  padding-top: 150px; // Adjust the padding value to account for the fixed nav bar
  display: flex;
  flex-direction: column; // Stack children vertically
  justify-content: center;
  align-items: center;
`;

const BoldHeader = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
`;

const GradientHeader = styled.h1`
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
  background: linear-gradient(to right, blue, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline;
`;

const StyledButton = styled(Button)`
  margin-top: 40px; // Adjust the margin value as needed
  padding: 25px 40px; // Increase padding for a larger button
  font-size: 1.5rem; // Increase font size
  width: auto; // Adjust width if needed
  height: auto; // Adjust height if needed
`;

const NavBarButton = styled(Button)`
  padding: 15px 20px; // Increase padding for a larger button
  font-size: 1rem; // Increase font size
  width: auto; // Adjust width if needed
  height: auto; // Adjust height if needed
  margin-left: auto; // Push the button to the right
  margin-right: 20px; // Add some padding to the right
`;

const StyledImage = styled(Image)`
  margin-top: 60px;
  margin-bottom: 60px;
  width: 80vw;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const LeftAlignedContainer = styled.div`
  align-items: flex-start;
  text-align: left;
  padding-top: 100px; // Adjust the padding value to account for the fixed nav bar
  padding: 0 60px; // Add horizontal padding
`;

const StyledBox = styled.div`
  width: 60%;
  margin: 20px 0; // Remove auto centering and add vertical margin
  padding: 20px;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    #4b0082,
    #8a2be2
  ); // Dark purple gradient
`;

const CatchyText = styled.p`
  font-size: 2rem; // Bigger font size
  color: #fff; // White text
  text-align: left; // Left justified
  font-weight: 500; // Semi-bold
  padding: 20px; // Add padding
`;
