import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar } from "../../components/avatar";
import { Statcard } from "../../components/statcard";
import { COLORS } from "../../util/Colors";
import { GiMustache } from "react-icons/gi";
import { ListItem } from "../../components/listitem";
import { useEffect } from "react";

import { getTracks, getTrackAnalytics, calculateStats } from "./userTopActions";
import { CustomButton } from "../../components/button";
import { testRequest } from "../../api/content";

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
  min-height: 10vh;
  margin-bottom: 150px;
  margin-top: 60px;
`;

const StatsCardsContainer = styled.div`
  min-width: 100vw;
  background-color: ${COLORS["bg-white"]};
  position: relative;
`;

const CardsContainer = styled.div`
  max-width: min(90vw, 1200px);
  margin-left: auto;
  margin-right: auto;
  margin-top: -7rem;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  gap: 2rem;
  padding: 3rem;
  overflow-x: auto;
  overscroll-behavior-inline: contain;

  
`;

const ListSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  min-height: 35vh;
  min-width: 100vw;
  background-color: ${COLORS["bg-white"]};
  justify-content: center;
  gap: 10px;
`;

const ListContainer = styled.div`
  min-height: 100px;
  min-width: 600px;
`;

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { topTracks, stats, loading } = useSelector((state) => state.userTop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTracks())
      .then(() => dispatch(getTrackAnalytics()))
      .then(() => dispatch(calculateStats()));
  }, []);

  return (
    <>
      <DashboardContainer>
        <AvatarContainer>
          <Avatar imgSrc={userInfo.imageURL}></Avatar>
          <h1>{userInfo.name}</h1>
        </AvatarContainer>
        <StatsCardsContainer>
          <CardsContainer>
            <Statcard
              icon="🕺🏻"
              title="Tanzbarkeit"
              value={loading ? "??" : stats.avgDanceability}
              unit="%"
            />
            <Statcard
              icon="🏃‍♀"
              title="Deine aktuelle Pace"
              value={stats.avgTempo}
              unit="BPM"
            />
            <Statcard
              icon="⚡"
              title="Trackenergie"
              value={stats.avgEnergy}
              unit="/100"
            />
            <Statcard
              icon={<GiMustache />}
              title="Hipsterlevel"
              value="61"
              unit="%"
            />
          </CardsContainer>
        </StatsCardsContainer>
        <ListSection>
          <ListContainer>
            <h5>Deine aktuellen Toptracks</h5>
            {topTracks.map((track, index) => {
              return (
                <>
                  <ListItem
                    key={index}
                    index={index + 1}
                    imgSrc={track.imageURL}
                    title={track.name}
                    subtitle={track.artist.map((artist) => artist.name + ", ")}
                  />
                </>
              );
            })}
          </ListContainer>
          <ListContainer>
            <h5>Deine aktuellen Topartists</h5>
            <ListItem
              index="1"
              imgSrc="https://i.scdn.co/image/ab67616d0000b273c5c99315111b580f37efb689"
              title="Song Titel kommt hier hin"
              subtitle="Artist1 Artist2 Artist 3"
            />
          </ListContainer>
        </ListSection>
      </DashboardContainer>
    </>
  );
}
