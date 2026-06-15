import {
  MusifyAlbum,
  MusifyArtist,
  MusifyPlaylist,
  MusifyTrack,
} from "../app/app/_types/musify";

export interface ChatbotResponse {
  message: string;
  recomendations: {
    tracks: MusifyTrack[];
    albums: MusifyAlbum[];
    artists: MusifyArtist[];
    playlists: MusifyPlaylist[];
  };
}
