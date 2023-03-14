import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLORS } from "/src/util/Colors";
import { CustomButton } from "/src/components/button";
import { LoadingOverlay } from "/src/components/loadingoverlay";
import BackgroundShape from "/src/assets/soundwaves.svg";

import { login } from "../Auth/authActions";
import { getLoginUrl } from "/src/api/auth";

const SectionContainer = styled.div`
  display: flex;
  max-width: min(90vw, 1500px);
  min-height: 50vh;
  align-items: center;
  padding: 3rem 0;
  margin: 0 auto;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ModalLink = styled.a`
  cursor: pointer;
  position: relative;
  :hover {
    color: ${COLORS.primary};
  }
`;

const ModalMessage = styled.div`
  padding: 2rem;
  max-width: 60vw;
  width: 250px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  top: 50px;
  cursor: auto;
  z-index: 50;
`;

export default function HeroSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loggedIn } = useSelector((state) => state.auth);
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let popupWindow = useRef();
  let popupClosedInterval = useRef();

  const openLoginPopup = () => {
    setLoginInProgress(true);

    //Position des PopUps auf dem Bildschirm
    const top = window.outerHeight / 2 + window.screenY - 600 / 2;
    const left = window.outerWidth / 2 + window.screenX - 700 / 2;
    popupWindow.current = window.open(
      getLoginUrl(),
      "Spotify Login",
      `height=600,width=700,top=${top},left=${left}`
    );

    //Abfangen von Callback von Popup und prüfen ob Popup vor Abschluss der Authentifizierung geschlossen wurde.
    window.addEventListener("message", handleWindowMessage);
    popupClosedInterval.current = setInterval(() => {
      const popupClosed =
        !popupWindow.current ||
        !popupWindow.current.window ||
        popupWindow.current.window.closed;
      if (popupClosed) {
        clearInterval(popupClosedInterval.current);
        localStorage.removeItem("code_verifier");
        window.removeEventListener("message", handleWindowMessage);
        setLoginInProgress(false);
      }
    });
  };

  const handleWindowMessage = async (message) => {
    try {
      //Abfangen von Messages von Popup
      if (message.data.type === "callbackmessage") {
        if (message.data.payload.error) {
          throw new Error("Es kam kein Auth-Code von Spotify zurück");
        }
        popupWindow.current.close();

        //Auth-Code von Spotify aus URL an Login-Action weitergeben
        dispatch(login(message.data.payload.code))
          .unwrap()
          .then(() => {
            navigate("/dashboard");
            window.removeEventListener("message", handleWindowMessage);
          })
          .catch(() => {
            navigate("/account-signup");
            window.removeEventListener("message", handleWindowMessage);
          });
      }
    } catch (error) {
      console.error(error);

      //Reset falls Fehler aufgetreten ist
      window.removeEventListener("message", handleWindowMessage);
      popupWindow.current.close();
      localStorage.removeItem("code_verifier");
      setLoginInProgress(false);
    }
  };

  return (
    <SectionContainer>
      <LeftContainer>
        {Object.keys(userInfo).length === 0 ? (
          <h1>Entdecke Musik genau in deiner Pace</h1>
        ) : (
          <h1> Hi {userInfo.name}, entdecke Musik genau in deiner Pace</h1>
        )}

        <h6>
          Erhalte neue Einblicke in deine Lieblingsmusik auf Spotify und
          erstelle Playlist genau nach deinem Tempo. Du brauchst nur dein
          Spotify-Login und schon kann es losgehen.
        </h6>
        <ButtonGroup>
          {loggedIn ? (
            <CustomButton onClick={() => navigate("/dashboard")}>
              Zum Dashboard
            </CustomButton>
          ) : (
            <CustomButton onClick={openLoginPopup}>
              Mit Spotify einloggen
            </CustomButton>
          )}

          {loggedIn ? null : (
            <ModalLink onClick={() => setOpenModal(!openModal)}>
              Noch kein Zugang?
              {openModal ? (
                <ModalMessage>
                  <p>
                    Damit du die Webseite mit deinem eigenen Spotify-Account
                    verwenden kannst, muss dieser zuerst freigegeben werden.
                    Kontaktiere mich und teil mir die Email-Adresse deines
                    Spotify-Accounts mit, damit ich dich freischalten kann. Dies
                    ist nicht mehr nötig sobald das Review durch Spotify
                    abgeschlossen ist.{" "}
                  </p>
                </ModalMessage>
              ) : null}
            </ModalLink>
          )}
        </ButtonGroup>
        <BackgroundImage src={BackgroundShape} alt="" />
      </LeftContainer>
      {loginInProgress ? <LoadingOverlay /> : null}
    </SectionContainer>
  );
}
