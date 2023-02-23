import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from "../components/spinner";

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ element }) => {
  const { loggedIn, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return loggedIn ? element : <Navigate to={"/"} />;
};

export default ProtectedRoute;
