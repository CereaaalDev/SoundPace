import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DashboardContainer = styled.div`
  min-height: 90vh;
`;

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <DashboardContainer>
        <h1>Profile Name: {userInfo.name}</h1>
        <Link to={"/"}>Home</Link>
      </DashboardContainer>
    </>
  );
}
