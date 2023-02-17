import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CustomButton } from "../../components/button";
import { PlaylistCard } from "../../components/playlistcard";
import { getPlaylists } from "./paceCreatorActions";
import { selectPlaylist } from "./paceCreatorSlice";
import { Spinner } from "../../components/spinner";
import { useEffect, useState } from "react";

const HeaderSection = styled.section`
  width: 100vw;
`;

const ContentSsection = styled.section`
  background-color: white;
  width: 100vw;
  min-height: 80vh;
`;

const HeaderContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  max-width: min(1500px, 90vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaylistCardContainer = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  justify-content: center;
`;

export function PaceCreator() {
  const { loading, userPlaylists } = useSelector((state) => state.paceCreator);
  const [totalSelected, setTotalSelected] = useState(0);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getPlaylists());
  }, [])

  useEffect(() => {
    setTotalSelected(
      userPlaylists
        .filter((playlist) => playlist.selected)
        .reduce((tot, cur) => tot + cur.tracks.total, 0)
    );
  }, [userPlaylists]);

  return (
    <>
      <HeaderSection>
        <HeaderContainer>
          <h1>Erstelle deine Pacelist</h1>
          <h6>Hier kommt dann der Stepper</h6>
        </HeaderContainer>
      </HeaderSection>
      <ContentSsection>
        <ContentContainer>
          <h2>{totalSelected} Tracks ausgewählt</h2>
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
        </ContentContainer>
      </ContentSsection>
    </>
  );
}
