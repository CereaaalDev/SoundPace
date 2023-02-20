import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PlaylistCard } from "../../components/playlistcard";
import { getPlaylists } from "./paceCreatorActions";
import { nextStep, previousStep, resetSuccess, selectPlaylist } from "./paceCreatorSlice";
import { Spinner } from "../../components/spinner";
import { useEffect, useState } from "react";
import { CustomButton } from "../../components/button";

const PlaylistCardContainer = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  justify-content: center;
  max-height: 70vh;
  overflow: auto;
  margin-top: 4rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem;
  justify-content: center;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
`;
const SelectionValue = styled.h3`
  margin: 0;
`;
const SelectionDescription = styled.h6`
  margin: 0;
`;

const InstructionContainer = styled.div`
  padding: 2rem 0;
`;

export function PlaylistChoice() {
  const { loading, userPlaylists } = useSelector((state) => state.paceCreator);
  const [totalSelected, setTotalSelected] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    //nur Laden falls noch keine Daten geladen wurden
    if (userPlaylists.length === 0) {
      dispatch(getPlaylists());
    }
  }, []);

  useEffect(() => {
    setTotalSelected(
      userPlaylists
        .filter((playlist) => playlist.selected)
        .reduce((tot, cur) => tot + cur.tracks.total, 0)
    );
  }, [userPlaylists]);

  return (
    <>
      <InstructionContainer>
        <h5>Von wo soll deine Musik analysiert werden?</h5>
        <p>
          Klicke auf eine oder mehrere Playlists um sie für die Analyse
          vorzubereiten. Die ausgewählten Tracks werden im nächsten Schritt
          analysiert.
        </p>
      </InstructionContainer>

      <SelectionContainer>
        <SelectionValue>{totalSelected}</SelectionValue>
        <SelectionDescription>Tracks ausgewählt</SelectionDescription>
      </SelectionContainer>

      <ButtonContainer>
        <CustomButton disabled={totalSelected === 0} onClick={() => dispatch(nextStep())}>
          Nächster Schritt
        </CustomButton>
      </ButtonContainer>

      <PlaylistCardContainer>
        {userPlaylists && !loading ? (
          userPlaylists.map((playlist) => {
            return (
              <PlaylistCard
                key={playlist.id}
                title={playlist.name}
                trackcount={playlist.tracks.total}
                imgSrc={playlist.images[0] ? playlist.images[0].url : ""}
                selected={playlist.selected}
                onClick={() => dispatch(selectPlaylist(playlist.id))}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </PlaylistCardContainer>
    </>
  );
}
