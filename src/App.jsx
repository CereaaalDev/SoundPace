import { Outlet } from "react-router-dom";
import "./css_reset.css";
import "./App.css";
import { login } from "./features/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { loggedIn, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!loggedIn && localStorage.getItem("refresh_token")) {
      dispatch(login());
    }else if(!loggedIn){
      dispatch(logout())
    }
  }, []);

  return (
    <>
      <div className="app">
        <h1>Hier kommt dann die Navigation</h1>
      </div>
      <Outlet />
    </>
  );
}
