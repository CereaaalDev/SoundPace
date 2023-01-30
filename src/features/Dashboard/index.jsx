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
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 10vh;
  margin-bottom: 100px;
  margin-top: 60px;
`;

const StatsCardsContainer = styled.div`
  width: 100vw;
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
  min-height: 35vh;
  width: 100vw;
  background-color: ${COLORS["bg-white"]};
  display: flex;
  justify-content: center;
`;

const ListGroup = styled.div`
  max-width: min(90vw, 1500px);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5rem;
  margin-bottom: 5rem;
`;

const ListContainer = styled.div`
  flex: 1 0 auto;
  max-width: 90vw;
  h5{
    color: ${COLORS.primary};
    font-weight: 600;
    padding-bottom: 2rem;
  }
`;

const List = styled.div`
  max-height: max(400px, 35vh);
  overflow: scroll;
`;

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { topTracks, topArtists, stats, loading } = useSelector(
    (state) => state.userTop
  );
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
              title="Deine aktuelle Ø Pace"
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
              value={stats.hipsterIndex}
              unit="/100"
            />
          </CardsContainer>
        </StatsCardsContainer>
        <ListSection>
          <ListGroup>
            <ListContainer>
              <h5>Deine aktuellen Lieblingshits</h5>
              <List>
                {!loading ? (topTracks.map((track, index) => {
                  return (
                    <ListItem
                      key={index}
                      index={index + 1}
                      imgSrc={track.imageURL}
                      title={track.name}
                      subtitle={track.artist.map(
                        (artist) => artist.name + ", "
                      )}
                      value={track.analytics ? (Math.round(track.analytics.tempo)+" BPM"):"..."}
                    />
                  );
                }))
                : 'Loading...'
                
                }
              </List>
            </ListContainer>

            <ListContainer>
              <h5>Deine aktuellen Lieblingskünstler</h5>
              <List>
                {!loading ? (topArtists.map((artist, index) => {
                  return (
                    <ListItem
                      key={index}
                      index={index + 1}
                      imgSrc={artist.images[0].url}
                      title={artist.name}
                      value={100-artist.popularity+"% HL"}
                    />
                  );
                }))
                : 'Loading...'
                }
              </List>
            </ListContainer>
          </ListGroup>
        </ListSection>
      </DashboardContainer>
    </>
  );
}
