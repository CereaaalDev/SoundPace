import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { PlaylistCard } from "../../components/playlistcard";
import { getPlaylists } from "./paceCreatorActions";
import { selectPlaylist } from "./paceCreatorSlice";
import { Spinner } from "../../components/spinner";
import { useEffect, useState } from "react";

const PlaylistCardContainer = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(150px, max-content));
  justify-content: center;
`;

export function PlaylistChoice() {
  const { loading, userPlaylists } = useSelector((state) => state.paceCreator);
  const [totalSelected, setTotalSelected] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlaylists());
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
    </>
  );
}
