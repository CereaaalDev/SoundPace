import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentAPI } from "../../api/content";

export const getPlaylists = createAsyncThunk(
  "paceCreator/getPlaylists",
  async (url, {dispatch, rejectWithValue }) => {
    try {
      let responsePlaylist = '';

      if(!url){
        responsePlaylist = await contentAPI.get(`/me/playlists?limit=50`);
      }else{
        responsePlaylist = await contentAPI.get(url);
      }      
    //   const responsePlaylist = await contentAPI.get(`https://api.spotify.com/v1/me/tracks?offset=20&limit=20&locale=de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,la;q=0.5,es;q=0.4`);
   
    // const responsePlaylist = await contentAPI.get(`https://api.spotify.com/v1/playlists/37i9dQZF1EUMDoJuT8yJsl`);

        console.log(responsePlaylist.data)
    //   if (responseTracks && responseTracks.data && responseArtists && responseArtists.data) {
    //     return {tracks: responseTracks.data, artists: responseArtists.data}
    //   }
      if(responsePlaylist.data.next != null){
        dispatch(getPlaylists(responsePlaylist.data.next))
      }

      return responsePlaylist.data.items;


    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);