import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTracksOfSelectedPlaylists,
  getAnalyticsOfSelectedTracks,
} from "./paceCreatorActions";

import { Spinner } from "../../components/spinner";

import Slider from "@mui/material/Slider";
import { COLORS } from "../../util/Colors";

import styled from "styled-components";
import { ListItem } from "../../components/listitem";

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const FilterBox = styled.div`
  padding: 1rem 3rem;
  border-radius: 8px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const paceLabel = [
  {
    value: 40,
    label: "langsam",
  },
  {
    value: 200,
    label: "schnell",
  },
];

const engeryLabel = [
  {
    value: 0,
    label: "schwach",
  },
  {
    value: 100,
    label: "geladen",
  },
];
const danceLabel = [
  {
    value: 0,
    label: "Schlecht",
  },
  {
    value: 100,
    label: "Gut",
  },
];

export function Settings() {

  const { loading, selectedTracks } = useSelector((state) => state.paceCreator);
  const [filteredTracks, setFilteredTracks] = useState(selectedTracks);
  const [tempoFilter, setTempoFilter] = useState([80, 130]);
  const [energyFilter, setEnergyFilter] = useState([60, 100]);
  const [danceFilter, setDanceFilter] = useState([10, 100]);

  const dispatch = useDispatch();



  useEffect(() => {
    //Initiales Laden der Tracks aus den ausgewählten Playlist und danach die zugehörigen Analytics
    dispatch(getTracksOfSelectedPlaylists()).then(() =>
      dispatch(getAnalyticsOfSelectedTracks())
    );
  }, []);

  useEffect(() => {
    setFilteredTracks(
      selectedTracks.filter(
        (track) =>
          track.analytics?.tempo > Math.min(...tempoFilter) &&
          track.analytics?.tempo < Math.max(...tempoFilter) &&
          track.analytics?.energy > Math.min(...energyFilter) / 100 &&
          track.analytics?.energy < Math.max(...energyFilter) / 100 &&
          track.analytics?.danceability > Math.min(...danceFilter) / 100 &&
          track.analytics?.danceability < Math.max(...danceFilter) / 100
      )
    );
  }, [tempoFilter, energyFilter, danceFilter]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <FilterContainer>
          <FilterBox>
            <h3>Pace</h3>
            <Slider
              onChange={(e, value) => setTempoFilter(value)}
              value={tempoFilter}
              min={40}
              max={200}
              valueLabelDisplay="on"
              sx={{
                color: COLORS.primary,
                width: "250px",
              }}
              marks={paceLabel}
              valueLabelFormat={(value) => <div>{value} BPM</div>}
            />
          </FilterBox>
          <FilterBox>
            <h3>Energie</h3>
            <Slider
              onChange={(e, value) => setEnergyFilter(value)}
              value={energyFilter}
              min={0}
              max={100}
              valueLabelDisplay="on"
              sx={{
                color: COLORS.primary,
                width: "250px",
              }}
              marks={engeryLabel}
            />
          </FilterBox>
          <FilterBox>
            <h3>Tanzbarkeit</h3>
            <Slider
              onChange={(e, value) => setDanceFilter(value)}
              value={danceFilter}
              min={0}
              max={100}
              valueLabelDisplay="on"
              sx={{
                color: COLORS.primary,
                width: "250px",
              }}
              marks={danceLabel}
            />
          </FilterBox>
        </FilterContainer>
      )}

      <ListContainer>
        {filteredTracks
          ? filteredTracks.map((track, index) => (
              <ListItem
                key={index}
                title={track.track.name}
                subtitle={track.track.artists.map(artist => artist.name).join(', ')}
                index={index + 1}
              />
            ))
          : null}
      </ListContainer>
    </>
  );
}
