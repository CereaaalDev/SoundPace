import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "../../components/avatar";
import { Statcard } from "../../components/statcard";
import { COLORS } from "../../util/Colors";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 15vh;
  margin-bottom: 150px;
  margin-top: 60px;
`;

const StatsCardsContainer = styled.div`
  min-height: 80vh;
  min-width: 100vw;
  background-color: ${COLORS["bg-white"]};
  position: relative;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: -5rem;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
  gap: 1rem; ;
  max-width: 1500px;
`;

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <DashboardContainer>
        <AvatarContainer>
          <Avatar imgSrc={userInfo.imageURL}></Avatar>
          <h1>{userInfo.name}</h1>
        </AvatarContainer>
        <StatsCardsContainer>
          <CardsContainer>
            <Statcard />
            <Statcard />
            <Statcard />
            <Statcard />
          </CardsContainer>
        </StatsCardsContainer>
      </DashboardContainer>
    </>
  );
}
