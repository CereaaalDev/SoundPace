import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Avatar } from "/src/components/avatar";
import { Statcard } from "/src/components/statcard";
import { COLORS } from "/src/util/Colors.js";
import { GiMustache } from "react-icons/gi";
import { ListItem } from "/src/components/listitem";
import { Spinner } from "/src/components/spinner";

import { getTracks, getTrackAnalytics, calculateStats } from "./userTopActions";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
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
  flex: 1;
  max-width: 90vw;
  h5 {
    color: ${COLORS.primary};
    font-weight: 600;
    padding-bottom: 2rem;
  }
`;

const List = styled.div`
  max-height: max(400px, 35vh);
  overflow: scroll;
`;

const SelectorGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  margin-bottom: 2rem;
  text-align: center;

  //kleinere Selector-Group auf kleineren Geräten
  @media (max-width: 768px) {
    > * {
      flex: 0;
    }
  }

  input {
    display: none;
  }
  label {
    background-color: white;
    display: inline-block;
    padding: 1rem;
    cursor: pointer;
    border: 1px solid ${COLORS["bg-grey"]};
    transition: all 0.2s ease;
  }
  label:first-of-type {
    border-radius: 8px 0 0 8px;
    border-right: none;
  }
  label:last-child {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
  label:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    color: ${COLORS.primary};
  }

  input:checked + label {
    background-color: ${COLORS.primary};
    color: white;
    border: 1px solid ${COLORS.primary};
  }
`;

export default function Dashboard() {
  const { userInfo } = useSelector((state) => state.auth);
  const { topTracks, topArtists, stats, loading } = useSelector(
    (state) => state.userTop
  );
  const [timeSpan, setTimeSpan] = useState("short_term");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTracks(timeSpan))
      .then(() => dispatch(getTrackAnalytics()))
      .then(() => dispatch(calculateStats()));
  }, [timeSpan]);

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
              value={loading ? <Spinner /> : stats.avgDanceability}
              unit={loading ? "" : "%"}
            />
            <Statcard
              icon="🏃‍♀"
              title="Deine aktuelle Ø Pace"
              value={loading ? <Spinner /> : stats.avgTempo}
              unit={loading ? "" : "BPM"}
            />
            <Statcard
              icon="⚡"
              title="Trackenergie"
              value={loading ? <Spinner /> : stats.avgEnergy}
              unit={loading ? "" : "/100"}
            />
            <Statcard
              icon={<GiMustache />}
              title="Hipsterlevel"
              value={loading ? <Spinner /> : stats.hipsterIndex}
              unit={loading ? "" : "/100"}
            />
          </CardsContainer>
          <SelectorGroup>
            <input
              id="radio1"
              type="radio"
              name="timespan"
              checked={timeSpan === "short_term"}
              onChange={() => setTimeSpan("short_term")}
            />
            <label htmlFor="radio1">Letzte 4 Wochen</label>
            <input
              id="radio2"
              type="radio"
              name="timespan"
              checked={timeSpan === "medium_term"}
              onChange={() => setTimeSpan("medium_term")}
            />
            <label htmlFor="radio2">Letzte 6 Monate</label>
            <input
              id="radio3"
              type="radio"
              name="timespan"
              checked={timeSpan === "long_term"}
              onChange={() => setTimeSpan("long_term")}
            />
            <label htmlFor="radio3">Seit beginn</label>
          </SelectorGroup>
        </StatsCardsContainer>
        <ListSection>
          <ListGroup>
            <ListContainer>
              <h5>Deine aktuellen Lieblingshits</h5>
              <List>
                {!loading ? (
                  topTracks.map((track, index) => {
                    return (
                      <ListItem
                        key={index}
                        index={index + 1}
                        imgSrc={track.imageURL}
                        title={track.name}
                        subtitle={track.artist
                          .map((artist) => artist.name)
                          .join(", ")}
                        value={
                          track.analytics
                            ? [Math.round(track.analytics.tempo) + " BPM"]
                            : ["..."]
                        }
                      />
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </List>
            </ListContainer>

            <ListContainer>
              <h5>Deine aktuellen Lieblingskünstler</h5>
              <List>
                {!loading ? (
                  topArtists.map((artist, index) => {
                    return (
                      <ListItem
                        key={index}
                        index={index + 1}
                        imgSrc={artist.images[0].url}
                        title={artist.name}
                        value={[100 - artist.popularity + "% HL"]}
                      />
                    );
                  })
                ) : (
                  <Spinner />
                )}
              </List>
            </ListContainer>
          </ListGroup>
        </ListSection>
      </DashboardContainer>
    </>
  );
}
