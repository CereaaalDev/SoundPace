import styled from "styled-components";
import { PlaylistChoice } from "./PlaylistChoice";
import { Settings } from "./Settings";
import { Stepper } from "../../components/stepper";
import { useSelector } from "react-redux";
import { CreatePlaylist } from "./CreatePlaylist";

const HeaderSection = styled.section`
  width: 100%;
`;

const ContentSection = styled.section`
  background-color: white;
  width: 100%;
  min-height: 80vh;
`;

const HeaderContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
`;

export function PaceCreator() {
  const { currentStep } = useSelector((state) => state.paceCreator);

  return (
    <>
      <HeaderSection>
        <HeaderContainer>
          {currentStep === 1 ? <h1>Wähle deine Quelle</h1> : null}
          {currentStep === 2 ? <h1>Konfiguriere deine Pace</h1> : null}
          {currentStep === 3 ? <h1>Erstelle deine Playlist</h1> : null}
        </HeaderContainer>
      </HeaderSection>
      <ContentSection>
        <ContentContainer>
          {currentStep === 1 ? <PlaylistChoice /> : null}
          {currentStep === 2 ? <Settings /> : null}
          {currentStep === 3 ? <CreatePlaylist /> : null}
        </ContentContainer>
      </ContentSection>
    </>
  );
}
