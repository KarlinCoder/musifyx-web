import { DeezerAlbum, DeezerArtist, DeezerTrack } from "./deezer";

export interface ChatbotResponse {
  message: string;
  recomendations: (DeezerTrack | DeezerAlbum | DeezerArtist)[];
}
