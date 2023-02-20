import styled from "styled-components";
import { useState } from "react";
import { PlaylistChoice } from "./PlaylistChoice";
import { Settings } from "./Settings";
import { Stepper } from "../../components/stepper";
import { CustomButton } from "../../components/button";
import { useSelector } from "react-redux";
import { CreatePlaylist } from "./CreatePlaylist";

const HeaderSection = styled.section`
  width: 100vw;
`;

const ContentSection = styled.section`
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
  margin-bottom: 1rem;
`;

const ContentContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;

`;

export function PaceCreator() {
  const { currentStep } = useSelector((state) => state.paceCreator)

  return (
    <>
      <HeaderSection>
        <HeaderContainer>
          <h1>Wähle deine Quelle</h1>
        </HeaderContainer>
      </HeaderSection>
      <ContentSection>
        <ContentContainer>

          {currentStep === 1 ? <PlaylistChoice /> : null}
          {currentStep === 2 ? <Settings /> : null}
          {currentStep === 3 ? <CreatePlaylist/> : null}
        </ContentContainer>
      </ContentSection>
    </>
  );
}
