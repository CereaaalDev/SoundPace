import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {

  getTracksOfSelectedPlaylists,
  getAnalyticsOfSelectedTracks

} from "./paceCreatorActions";

import { Spinner } from "../../components/spinner";
export function Settings() {
  const [minSpeed, setMinSpeed] = useState(90);
  const [maxSpeed, setMaxSpeed] = useState(160);

  const dispatch = useDispatch();

  const { loading, userPlaylists, } = useSelector(
    (state) => state.paceCreator
  );

  const selectedPlaylists = userPlaylists.filter(
    (playlist) => playlist.selected
  );

//   const getTrackDetails = () => {
//     const trackIds = selectedTracks.map((track) => track.track.id);
//     console.log(trackIds);

//     while (trackIds.length > 0) {
//       const chunk = trackIds.splice(0, 100).join();
//       console.log(chunk);
//       dispatch(getTrackAnalytics(chunk));
//     }
//   };

//   const triggerLoad = async () => {
//     let promises = [];
//     //getTrackIds of selected Playlists
//     promises = await selectedPlaylists.forEach((playlist) => {
//       return dispatch(getPLTrackIDs(playlist.tracks.href));
//     });

//     console.log(promises);
//     // Promise.all(promises).then(getTrackDetails());
//   };

  useEffect(() => {
    dispatch(getTracksOfSelectedPlaylists()).then(()=>
      dispatch(getAnalyticsOfSelectedTracks()))
  }, []);

  return (
    <>
        {loading ? <Spinner/> : <h1>Analytics geladen :) </h1>}
      
      <label>MinSpeed</label>
      <input type="text" onChange={(e) => setMinSpeed(e.target.value)} />
      <label>MaxSpeed</label>
      <input type="text" onChange={(e) => setMaxSpeed(e.target.value)} />

      <h6>
        Min: {minSpeed} / Max: {maxSpeed}
      </h6>
      <button onClick={() => dispatch(getTracksOfSelectedPlaylists())}>
        Show results
      </button>
    </>
  );
}
