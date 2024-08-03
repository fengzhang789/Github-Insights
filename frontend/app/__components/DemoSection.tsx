"use client";
import React from 'react';
import { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';
import project from "@/public/project-view.jpg";
import feature from "@/public/feature-view.jpg";
import user from "@/public/user-view.jpg";

const DemoSection = () => {
    const [activeView, setActiveView] = useState('project');
    const [progress, setProgress] = useState(0);
    const views = ['project', 'feature', 'user'];
    const switchInterval = 3000; // 3 seconds
    let textblurb;

    switch (activeView) {
        case "project":
            textblurb = <div>text 1</div>;
            break;
        case "feature":
            textblurb = <div>text 2</div>;
            break;
        case "user":
            textblurb = <div>text 3</div>;
            break;
        default:
            textblurb = <div>default text</div>;
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setActiveView(currentView => {
          const currentIndex = views.indexOf(currentView);
          const nextIndex = (currentIndex + 1) % views.length;
          return views[nextIndex];
        });
        setProgress(0);
      }, switchInterval);
  
      const progressIntervalId = setInterval(() => {
        setProgress(currentProgress => {
          if (currentProgress < 100) {
            return currentProgress + 1;
          }
          return currentProgress;
        });
      }, switchInterval / 100);
  
      return () => {
        clearInterval(intervalId);
        clearInterval(progressIntervalId);
      };
    }, []);

  return (
    <DemoContainer>
      <h2> Different Views for Finding Relevant Commits</h2>
      <DemoContent>
      <ViewSelector>
          {views.map(view => (
            <React.Fragment key={view}>
            <ViewOption active={view === activeView} onClick={() => {setActiveView(view)}}>
              {view}
            </ViewOption>
            
            <ProgressBarContainer>
            {view === activeView && view !== 'user' &&
            
                <ProgressBar progress={progress}/>}
            </ProgressBarContainer>

          </React.Fragment>
          ))}
        </ViewSelector>
        <ImageContainer>
        <DemoImage src={`/${activeView}-view.jpg`} alt={`${activeView} view`}/>
            {textblurb}
        </ImageContainer>
      </DemoContent>
    </DemoContainer>
  );
};

const DemoContainer = styled.section`
  padding: 40px;
  color: white;
  padding-top: 8rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; 
  h2 {
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const DemoContent = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ViewSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

interface ViewOptionProps {
    active: boolean;
  }

const ViewOption = styled.div<ViewOptionProps>`
  width: 6rem; /* Set this to your desired width */
  height: 6rem; /* Set this to the same value as width */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4a4a8f' : 'transparent'};
  background: ${props => props.active ? 'linear-gradient(to top right, #4b0082, #8a2be2)' : ''};
  border: ${props => props.active ? '3px solid white' : '1px solid gray'};
  transition: all 0.3s ease;
  text-align: center; /* Ensure text is centered in case of multiline */
  cursor: pointer;
  margin-top: -1rem;
`;


interface ProgressBarProps {
    progress: number;
}
const ProgressBar = styled.div<ProgressBarProps>`
  width: 2px;
  background-color: #ffffff;
  height: ${props => props.progress}%;
  transition: height 0.1s linear;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 6rem; /* Set this to the desired container height */
`;

const ImageContainer = styled.div`

    p {
        margin-top: 1rem;
    }
`;

const DemoImage = styled.img`
  width: 50svw; /* Set a standard width */
  height: 50svh; /* Set a standard height */
  object-fit: cover; /* Ensures the image covers the entire area */
  border-radius: 8px;
  margin-top: 1rem;
  margin-left: 4rem;
`;


export default DemoSection;