import { Outlet, useNavigate } from "react-router-dom";

import { login } from "./authActions.js";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUrl } from "../../api/auth";

import styled from "styled-components";

const BackgroundContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 9;
`;

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.auth);

  let popupWindow;

  const openLoginPopup = () => {
    const top = window.outerHeight / 2 + window.screenY - 600 / 2;
    const left = window.outerWidth / 2 + window.screenX - 700 / 2;
    popupWindow = window.open(
      getLoginUrl(),
      "Spotify Login",
      `height=600,width=700,top=${top},left=${left}`
    );
    window.addEventListener("message", handleWindowMessage);
    //todo: hier noch prüfen ob Popup geschlossen wurde
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
    }
  };

  if (loading) {
    return (
      <>
        <h1>JAAAAA das kommmt von hier</h1>
      </>
    );
  }

  return (
    <>
      <BackgroundContainer>
        <h1>Welcome {userInfo ? userInfo.name : ""} to SoundPace</h1>
        <p>Klicke auf den Link um dich einzuloggen</p>
        <button onClick={openLoginPopup}>Login</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>

        <Outlet />
      </BackgroundContainer>
    </>
  );
}
