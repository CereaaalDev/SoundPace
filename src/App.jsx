import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { logout } from "./features/Auth/authSlice";
import { login } from "./features/Auth/authActions";

import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

const AppContainer = styled.div``;

export default function App() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);

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
      <Footer />
    </AppContainer>
  );
}
