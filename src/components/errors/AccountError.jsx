import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CustomButton } from "../button";

const HeaderSection = styled.section`
  width: 100%;
  padding-top: 4rem;
`;

const HeaderContainer = styled.div`
  width: min(90vw, 1500px);
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 0;
`;

const ContentSection = styled.section`
  background-color: white;
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
`;

const ErrorContainer = styled.div`
  width: min(90vw, 1500px);
  margin: 0 auto;

  p {
    padding-bottom: 3rem;
  }
`;

export default function AccountError() {
  const navigate = useNavigate();

  return (
    <>
      <HeaderSection>
        <HeaderContainer>
          <h1>Account ist nicht freigeschaltet</h1>
        </HeaderContainer>
      </HeaderSection>

      <ContentSection>
        <ErrorContainer>
          <h5>
            Hmmm... dein Spotify-Account scheint noch nicht freigeschaltet zu
            sein
          </h5>
          <p>
            Bevor SoundPace durch Spotify freigegeben wird, muss dein Account
            manuell für die App freigeschaltet werden. Kontaktiere mich und
            teile mir die E-Mail Adresse deines Spotify-Kontos mit, damit du die
            App mit diesem Spotify-Account verwenden kannst. Sorry für die
            Umstände!
          </p>
          <CustomButton onClick={() => navigate("/")}>Home</CustomButton>
        </ErrorContainer>
      </ContentSection>
    </>
  );
}
