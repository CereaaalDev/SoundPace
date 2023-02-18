
import styled from "styled-components";
import { useState } from "react";
import { PlaylistChoice } from "./PlaylistChoice";
import { Settings } from "./Settings";

const HeaderSection = styled.section`
  width: 100vw;
`;

const ContentSsection = styled.section`
  background-color: white;
  width: 100vw;
  min-height: 80vh;
`;

const HeaderContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaylistCardContainer = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  justify-content: center;
`;

export function PaceCreator() {

  const [step, setStep] = useState('1');

  return (
    <>
      <HeaderSection>
        <HeaderContainer>
          <h1>Erstelle deine Pacelist</h1>
          <h6>Hier kommt dann der Stepper</h6>
          <input onChange={(e)=>setStep(e.target.value)}/>
        </HeaderContainer>
      </HeaderSection>
      <ContentSsection>
        <ContentContainer>

        {step === '1' ? 
          <PlaylistChoice/> : null
        }

        {step === '2' ? 
          <Settings/> : null
        }
         
        </ContentContainer>
      </ContentSsection>
    </>
  );
}
