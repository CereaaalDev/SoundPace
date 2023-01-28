import { CustomButton } from "../../components/button";
//import Login from '../auth/Login'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLORS } from "../../util/Colors";
import { login } from "../auth/authActions";

import { getLoginUrl } from "../../api/auth";
import { useState } from "react";
import { LoadingOverlay } from "../../components/loadingoverlay";

const SectionContainer = styled.div`
  display: flex;
  max-width: 1500px;
  min-height: 50vh;
  align-items: center;
  width: 100%;
  padding-left: 5vw;
`;

const LeftContainer = styled.div`
  max-width: 700px;
`;

const BackgroundImage = styled.img`
  max-width: 100%;
  position: absolute;
  right: 0px;
  top: 5vh;
  z-index: -1;
`;

function HeroSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.auth);
  const [logininProgress, setLoginInProgress] = useState(false);

  let popupWindow;
  let popupClosedInterval;

  const openLoginPopup = () => {
    setLoginInProgress(true);
    const top = window.outerHeight / 2 + window.screenY - 600 / 2;
    const left = window.outerWidth / 2 + window.screenX - 700 / 2;
    popupWindow = window.open(
      getLoginUrl(),
      "Spotify Login",
      `height=600,width=700,top=${top},left=${left}`
    );
    window.addEventListener("message", handleWindowMessage);
    //todo: hier noch prüfen ob Popup geschlossen wurde
    popupClosedInterval = setInterval(() => {
      const popupClosed =
        !popupWindow || !popupWindow.window || popupWindow.window.closed;
      if (popupClosed) {
        // Popup wurde vor Abschluss der Authentifizierung geschlossen.
        clearInterval(popupClosedInterval);
        localStorage.removeItem("code_verifier");
        window.removeEventListener("message", handleWindowMessage);
        setLoginInProgress(false);
      }
    });
  };

  const handleWindowMessage = async (message) => {
    try {
      if (message.data.type === "callbackmessage") {
        if (message.data.payload.error) {
          throw new Error("Es kam kein Auth-Code von Spotify zurück");
        }

        popupWindow.close();
        //code aus URL and Login-Action weitergeben
        dispatch(login(message.data.payload.code));
        navigate("/dashboard");
        window.removeEventListener("message", handleWindowMessage);
      }
    } catch (error) {
      console.error(error);
      //TODO: dispatch of error State to update UI
      window.removeEventListener("message", handleWindowMessage);
      popupWindow.close();
      localStorage.removeItem("code_verifier");
      setLoginInProgress(false);
    }
  };

  return (
    <SectionContainer>
      <LeftContainer>
        <h1>Was ist deine Pace?</h1>
        <h2>
          Analysiere deine Musik und erstelle Playlists in genau deinem Tempo
        </h2>
        <CustomButton onClick={openLoginPopup}>
          Mit Spotify einloggen
        </CustomButton>
        <CustomButton type="secondary">Generelle Suche</CustomButton>
        <BackgroundImage src="src/assets/soundwaves.svg" alt="" />
      </LeftContainer>
      {logininProgress ? <LoadingOverlay /> : ""}
    </SectionContainer>
  );
}
export default HeroSection;
