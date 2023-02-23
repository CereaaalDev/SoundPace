import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { COLORS } from "/src/util/Colors";

import { ListItem } from "/src/components/listitem";
import { Spinner } from "/src/components/spinner";
import { CustomButton } from "/src/components/button";
import SoundPaceCover from "/src/assets/soundpacecover.jpg"

import { createPlaylist } from "./paceCreatorActions";
import { previousStep, removeFilteredTrack, restart } from "./paceCreatorSlice";

const InstructionContainer = styled.div`
  padding: 2rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-bottom: 2rem;
`;

const ListContainer = styled.div`
  width: 100%;
  max-height: 40vh;
  overflow: auto;
  margin-top: 5rem;
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
  padding: 2rem 0;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  max-width: 400px;
  input {
    padding: 1rem;
    border-radius: 50px;
    border: 2px solid ${COLORS.primary};
  }
  label {
    color: ${COLORS.primary};
  }
`;

const PlaylistCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 200px;
    height: 200px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    margin-bottom: 2rem;
  }
  h6 {
    margin: 0;
    font-weight: 600;
    font-family: "Poppins";
  }
  p {
    color: ${COLORS["text-light"]};
  }
`;

export function CreatePlaylist() {
  const { filteredTracks, loading, createPlaylistSuccessfull } = useSelector(
    (state) => state.paceCreator
  );
  const totalDuration = filteredTracks.reduce(
    (acc, track) => acc + track.track.duration_ms,
    0
  );
  const [playlistName, setPlaylistName] = useState("");
  const dispatch = useDispatch();
  return (
    <>
      <InstructionContainer>
        <h5>Erstelle deine neue Playlist</h5>
        <p>
          Gib deiner Playlist einen Namen und entferne falls nötig weitere
          Tracks aus deiner Liste.
        </p>
      </InstructionContainer>

      <SettingsContainer>
        {createPlaylistSuccessfull ? (
          <h4>✅ Playlist wurde erfolgreich erstellt</h4>
        ) : (
          <InputItem>
            <label>Namen deiner Playlist</label>
            <input
              type="text"
              placeholder="Gib einen Namen ein"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
            />
          </InputItem>
        )}
        <PlaylistCover>
          <img src={SoundPaceCover} />
          <h6>{playlistName}</h6>
          <p>
            {filteredTracks.length} Tracks |{" "}
            {Math.round(totalDuration / 1000 / 60)} Minuten
          </p>
        </PlaylistCover>
      </SettingsContainer>

      <ButtonContainer>
        <CustomButton
          type="secondary"
          disabled={false}
          onClick={() => dispatch(previousStep())}
        >
          Zurück
        </CustomButton>

        {loading ? (
          <Spinner />
        ) : createPlaylistSuccessfull ? (
          <CustomButton onClick={() => dispatch(restart())}>
            Neu beginnen
          </CustomButton>
        ) : (
          <CustomButton
            disabled={playlistName.length === 0}
            onClick={() => dispatch(createPlaylist(playlistName))}
          >
            Playlist erstellen
          </CustomButton>
        )}
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
                imgSrc={track.track.album.images[0].url}
                removable={true}
                onClick={() => dispatch(removeFilteredTrack(track.track.id))}
              />
            ))
          : null}
      </ListContainer>
    </>
  );
}
