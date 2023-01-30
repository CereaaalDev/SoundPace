import { Outlet } from "react-router-dom";
import { login } from "./features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "./features/auth/authSlice";
import { Navbar } from "./components/navbar";
import styled from "styled-components";
import { Footer } from "./components/footer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* margin-left: 5vw;  
   margin-right: 5vw; */
`;

export default function App() {
  const dispatch = useDispatch();
  const { loggedIn, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loggedIn && localStorage.getItem("refresh_token")) {
      dispatch(login());
    } else if (!loggedIn) {
      dispatch(logout());
    }
  }, []);

  return (
      <AppContainer>
        <Navbar></Navbar>
        <Outlet />
        <Footer/>
      </AppContainer>
  );
}
