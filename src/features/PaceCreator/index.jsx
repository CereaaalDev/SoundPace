import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CustomButton } from "../../components/button";
import { getPlaylists } from "./paceCreatorActions";

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
`

export function PaceCreator() {
    const dispatch = useDispatch();


    
  return (
    <>
        
    <HeaderSection>
      <HeaderContainer>
        <h1>Erstelle deine Pacelist</h1>
        <h6>Hier kommt dann der Stepper</h6>
      </HeaderContainer>
    </HeaderSection>
    <ContentSsection>
    <ContentContainer>
    <h2>Content</h2>
    <CustomButton onClick={()=>dispatch(getPlaylists())}>Dispatch Playlist Action</CustomButton>

    </ContentContainer>
       
    </ContentSsection>

    </>
    
  );
}
