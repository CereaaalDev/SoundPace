import { Outlet, useNavigate } from "react-router-dom";
import "./css_reset.css";
import "./App.css";
import { login } from "./features/auth/authActions";
import { useDispatch } from "react-redux";
import { getLoginUrl } from "./api/auth";

export default function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

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

        if(message.data.payload.error){
            throw new Error ('Es kam kein Auth-Code von Spotify zurück');
        }

        popupWindow.close();
        //code aus URL and Login-Action weitergeben
        dispatch(login(message.data.payload.code));
        window.removeEventListener("message", handleWindowMessage);
        navigate("/arrived");
      }
    } catch (error) {
      console.error(error);
      //TODO: dispatch of error State to update UI
      window.removeEventListener("message", handleWindowMessage);
      popupWindow.close();
      localStorage.removeItem('code_verifier')
    }
  };

  const request = async () => {
    console.log(sessionStorage.getItem("access_token"));

    const response = await fetch(
      "https://api.spotify.com/v1/audio-features/2czpGtNhPPVEh6hfedLpyT",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div className="app">
        <h1>Welcome to mySpotify</h1>
        <p>Klicke auf den Link um dich einzuloggen</p>
        <button onClick={openLoginPopup}>Login</button>
        <button onClick={request}>Request</button>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
