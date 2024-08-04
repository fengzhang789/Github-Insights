"use client";

import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { NavigationMenuDemo } from "@/app/__components/NavBar";
import DemoSection from "@/app/__components/DemoSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CodeDemo from "@/public/CodeDemo.png";
import Link from "next/link";
import { GradientSection } from "./__components/GradientSection";

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
        <div style={{ marginLeft: "auto", marginRight: "20px" }}>
          <Link href="/login">
            <NavBarButton variant={isScrolled ? "outline" : "default"}>
              Get Started
            </NavBarButton>
          </Link>
        </div>
      </NavBar>
      <ContentContainer>
        <BoldHeader>
          Visualize, Understand, Simplify: <br />
          <span>
            Your Commits, <GradientHeader>Reimagined.</GradientHeader>
          </span>
        </BoldHeader>
        <Link href="/login">
          <StyledButton>Get Started with GitInsights &gt;</StyledButton>
        </Link>
      </ContentContainer>
      <StyledImage src={CodeDemo} alt="Example" />
      <LeftAlignedContainer>
        <h1 style={{ fontSize: "4rem", fontWeight: "bold" }}>
          Understand Commits from a <br />
        </h1>

        <GradientHeader>Different Perspective.</GradientHeader>
        <StyledBox>
          <CatchyText>
            AI-powered commit histories, summarized so you know where to look
          </CatchyText>
        </StyledBox>
      </LeftAlignedContainer>

      <DemoSection />

      <FeaturesSection>
        <h2>Key Features</h2>
        <FeatureGrid>
          <FeatureCard>
            <h3>AI-Powered Analysis</h3>
            <p>
              Leverage advanced AI to get deep insights into your commit
              history.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>Visual Commit History</h3>
            <p>
              See your project&apos;s evolution with intuitive visualizations.
            </p>
          </FeatureCard>
          <FeatureCard>
            <h3>Team Collaboration</h3>
            <p>Understand team dynamics and contributions at a glance.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Performance Metrics</h3>
            <p>
              Track key performance indicators for your development process.
            </p>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <HowItWorksSection>
        <h2>How GitInsights Works</h2>
        <StepGrid>
          <Step>
            <h3>1. Connect Your Repository</h3>
            <p>Link your GitHub or GitLab repository to GitInsights.</p>
          </Step>
          <Step>
            <h3>2. AI Analysis</h3>
            <p>Our AI analyzes your commit history and codebase.</p>
          </Step>
          <Step>
            <h3>3. Generate Insights</h3>
            <p>Receive detailed visualizations and actionable insights.</p>
          </Step>
          <Step>
            <h3>4. Improve Your Workflow</h3>
            <p>Use the insights to optimize your development process.</p>
          </Step>
        </StepGrid>
      </HowItWorksSection>

      <TestimonialsSection>
        <h2>What Our Users Say</h2>
        <TestimonialGrid>
          <Testimonial>
            <Quote>
              &apos;GitInsights revolutionized how we understand our
              codebase.&apos;
            </Quote>
            <Author>Jane Doe, Senior Developer at TechCorp</Author>
          </Testimonial>
          <Testimonial>
            <Quote>
              &apos;The AI-powered summaries save us hours of code review
              time.&apos;
            </Quote>
            <Author>John Smith, CTO at StartupX</Author>
          </Testimonial>
        </TestimonialGrid>
      </TestimonialsSection>

      <CTASection>
      <GradientWrapper>
        <GradientSection />
      </GradientWrapper>
      <ContentWrapper>
        <h2>Ready to Reimagine Your Commits?</h2>
        <p>
          Join thousands of developers who have transformed their workflow with
          GitInsights.
        </p>
        <Link href='/login'>
          <StyledButton>Start Your Free Trial</StyledButton>
        </Link>
      </ContentWrapper>
    </CTASection>

      <Footer>
        <FooterDiv>
          <FooterSection>
            <h4>Product</h4>
            <FooterLink href="/features">Features</FooterLink>
            <FooterLink href="/docs">Documentation</FooterLink>
          </FooterSection>
          <FooterSection>
            <h4>Company</h4>
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterSection>
          <FooterSection>
            <h4>Legal</h4>
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterSection>
        </FooterDiv>
        <FooterBottom>
          <p>&copy; 2024 GitInsights. All rights reserved.</p>
          <SocialIcons>{/* Add social media icons/links here */}</SocialIcons>
        </FooterBottom>
      </Footer>
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
  padding: 15px 30px; // Balanced padding for a larger button
  font-size: 1.5rem; // Increase font size
  width: auto; // Adjust width if needed
  height: auto; // Adjust height if needed
  border-radius: 8px; // Rounded corners
  background-color: #4b0082; // Background color

  color: white; // Text color
  border: none; // Remove default border
  cursor: pointer; // Pointer cursor on hover
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Subtle box shadow
  transition:
    background-color 0.3s,
    transform 0.2s; // Smooth transitions

  &:hover {
    background-color: #6a0dad; // Darker background on hover
    transform: translateY(-2px); // Slight lift on hover
  }

  &:active {
    background-color: #3b0072; // Darker background on click
    transform: translateY(1px); // Slight push on click
  }
`;

const NavBarButton = styled(Button)`
  padding: 15px 20px; // Increase padding for a larger button
  font-size: 1rem; // Increase font size
  width: auto; // Adjust width if needed
  height: auto; // Adjust height if needed
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

// Features Section
const FeaturesSection = styled.section`
  padding: 80px 60px;

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 30px;
  border-radius: 8px;
  z-index: 0;
  min-height: 16rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid transparent;
  border-image: linear-gradient(45deg, #3498db, #8e44ad, #ff69b4);
  border-image-slice: 1;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #fff;
  }

  p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`;


// How It Works Section
const HowItWorksSection = styled.section`
  padding: 80px 60px;

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin-top: 40px;
`;

const rgbEffect = keyframes`
  0% { border-color: rgb(255,0,0); }
  20% { border-color: rgb(0,255,0); }
  40% { border-color: rgb(0,0,255); }
  60% { border-color: rgb(255,0,0); }
  80% { border-color: rgb(0,255,0); }
  100% { border-color: rgb(0,0,255); }
`;

const Step = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(to top, #000000, #242424);
  
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1.3rem;
    margin-bottom: 15px;
    color: #d4d4d4;
  }

  p {
    font-size: 1rem;
    color: #a0a0a0;
  }
`;

// Testimonials Section
const TestimonialsSection = styled.section`
  padding: 80px 60px;

  h2 {
    font-size: 3rem;
    font-weight: 600;
  }
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const Testimonial = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Quote = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 15px;
  color: #333;
`;

const Author = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #666;
`;

// Pricing Section
const PricingSection = styled.section`
  padding: 80px 60px;
  background-color: #ffffff;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const PricingCard = styled.div`
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    color: #333;
  }
`;

const Price = styled.p`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #4b0082;
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 30px;

  li {
    margin-bottom: 10px;
    color: #666;
  }
`;

// CTA Section
const CTASection = styled.section`
  position: relative;
  padding: 100px 60px;
  color: white;
  text-align: center;
  overflow: hidden;
  height: 70vh; // Adjust this as needed

  h2 {
    font-size: 3rem;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
    font-weight: 600;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 40px;
    position: relative;
    z-index: 1;
  }
`;

const GradientWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

// Footer
const Footer = styled.footer`
  color: white;
  padding: 60px 60px 30px;
`;

const FooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  margin-bottom: 30px;
  h4 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const FooterLink = styled.a`
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 10px;

  &:hover {
    color: white;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #555;
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcons = styled.div`
  // Add styles for social media icons
`;

// Reusable components
const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 40px;
  color: #333;
`;
