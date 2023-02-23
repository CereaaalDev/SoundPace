import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { COLORS } from "../../util/Colors";
import Slider from "@mui/material/Slider";

import { ListItem } from "../../components/listitem";
import { CustomButton } from "../../components/button";
import { Spinner } from "../../components/spinner";

import {
  getTracksOfSelectedPlaylists,
  getAnalyticsOfSelectedTracks,
} from "./paceCreatorActions";

import {
  addFilteredTracks,
  nextStep,
  previousStep,
  resetSuccess,
} from "./paceCreatorSlice";

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
  max-height: 40vh;
  overflow: auto;
  margin-top: 5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-bottom: 2rem;
`;

const InstructionContainer = styled.div`
  padding: 2rem 0;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;

  span {
    font-size: 16px;
  }
`;
const SelectionValue = styled.h3`
  margin: 0;
`;
const SelectionDescription = styled.h6`
  margin: 0;
`;

const FilterLabelContainer = styled.div``;

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
  const [tempoFilter, setTempoFilter] = useState([80, 160]);
  const [energyFilter, setEnergyFilter] = useState(35);
  const [danceFilter, setDanceFilter] = useState(35);

  const dispatch = useDispatch();

  useEffect(() => {
    //Initiales Laden der Tracks aus den ausgewählten Playlist und danach die zugehörigen Analytics
    dispatch(getTracksOfSelectedPlaylists()).then(() =>
      dispatch(getAnalyticsOfSelectedTracks())
    );
    dispatch(resetSuccess());
  }, []);

  useEffect(() => {
    setFilteredTracks(
      selectedTracks.filter(
        (track) =>
          track.analytics?.tempo > Math.min(...tempoFilter) &&
          track.analytics?.tempo < Math.max(...tempoFilter) &&
          track.analytics?.energy > energyFilter / 100 &&
          track.analytics?.danceability > danceFilter / 100
        // track.analytics?.energy > Math.min(...energyFilter) / 100 &&
        // track.analytics?.energy < Math.max(...energyFilter) / 100 &&
        // track.analytics?.danceability > Math.min(...danceFilter) / 100 &&
        // track.analytics?.danceability < Math.max(...danceFilter) / 100
      )
    );
  }, [tempoFilter, energyFilter, danceFilter, loading]);

  return (
    <>
      <InstructionContainer>
        <h5>Wähle deine Pace</h5>
        <p>
          Verschiebe die Regler der jeweiligen Kategorie um Tracks nach deinem
          Geschmack zusammenzustellen. Je nachdem wie viel Musik du im
          vorherigen Schritt ausgewählt hast, kann es etwas dauern bis die Daten
          geladen sind. Falls nötig kannst du im nächsten Schritt noch einzelne
          Tracks entfernen.
        </p>
      </InstructionContainer>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <FilterContainer>
            <FilterBox>
              <FilterLabelContainer>
                <h3>Pace</h3>
                <span>
                  min. {Math.min(...tempoFilter)} BPM / max.{" "}
                  {Math.max(...tempoFilter)} BPM
                </span>
              </FilterLabelContainer>

              <Slider
                onChange={(e, value) => setTempoFilter(value)}
                value={tempoFilter}
                min={40}
                max={200}
                valueLabelDisplay="auto"
                sx={{
                  color: COLORS.primary,
                  width: "250px",
                  paddingTop: "2rem",
                }}
                marks={paceLabel}
                valueLabelFormat={(value) => <div>{value} BPM</div>}
              />
            </FilterBox>
            <FilterBox>
              <FilterLabelContainer>
                <h3>Energylevel</h3>
                <span>min. {energyFilter} %</span>
              </FilterLabelContainer>
              <Slider
                onChange={(e, value) => setEnergyFilter(value)}
                value={energyFilter}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{
                  color: COLORS.primary,
                  width: "250px",
                }}
                marks={engeryLabel}
              />
            </FilterBox>
            <FilterBox>
              <FilterLabelContainer>
                <h3>Tanzbarkeit</h3>
                <span>min. {danceFilter} %</span>
              </FilterLabelContainer>
              <Slider
                onChange={(e, value) => setDanceFilter(value)}
                value={danceFilter}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{
                  color: COLORS.primary,
                  width: "250px",
                }}
                marks={danceLabel}
              />
            </FilterBox>
          </FilterContainer>

          <SelectionContainer>
            <SelectionValue>
              {filteredTracks.length}{" "}
              <span>/ {selectedTracks.length} Tracks </span>
            </SelectionValue>
            <SelectionDescription>
              entsprechen den Filterkriterien
            </SelectionDescription>
          </SelectionContainer>

          <ButtonContainer>
            <CustomButton
              type="secondary"
              disabled={false}
              onClick={() => dispatch(previousStep())}
            >
              Zurück
            </CustomButton>
            <CustomButton
              disabled={false}
              onClick={() => {
                dispatch(addFilteredTracks(filteredTracks));
                dispatch(nextStep());
              }}
            >
              Nächster Schritt
            </CustomButton>
          </ButtonContainer>

          <ListContainer>
            {filteredTracks
              ? filteredTracks.map((track, index) => (
                  <ListItem
                    key={index}
                    title={track.track.name}
                    subtitle={track.track.artists
                      .map((artist) => artist.name)
                      .join(", ")}
                    index={index + 1}
                    value={[
                      Math.round(track.analytics.tempo) + " BPM",
                      Math.round(track.analytics.danceability * 100) + "%",
                    ]}
                  />
                ))
              : null}
          </ListContainer>
        </>
      )}
    </>
  );
}
