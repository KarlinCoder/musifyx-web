export interface MFTrack {
  id: number;
  title: string;
  artists: MFArtist[];
  image_url: string;
  duration_ms: number;
  explicit_lyrics: boolean;
  preview_url: string | null;
}

export interface MFArtist {
  id: number;
  name: string;
  image_url: string;
}

export interface MFArtistPage extends MFArtist {
  nb_album: number;
  bio_html: string;
}

export interface MFAlbum {
  id: number;
  title: string;
  image_url: string;
  artist: MFArtist;
  explicit_lyrics: boolean;
  record_type: string;
}

export interface MFAlbumPage extends MFAlbum {
  duration: number;
  label: string;
  copyright: string;
  release_date: string;
  nb_tracks: number;
  tracks: MFTrack[];
}

export interface MFPlaylist {
  id: number;
  title: string;
  image_url: string;
  nb_tracks: number;
  is_official: boolean;
}

export interface MFPlaylistPage extends MFPlaylist {
  add_date: Date;
  mod_date: Date;
  duration: number;
  description: string;
  tracks: MFTrack[];
}

export interface MFPopular {
  tracks: MFTrack[];
  albums: MFAlbum[];
  artists: MFArtist[];
  playlists: MFPlaylist[];
}

export interface MFSearch<T> {
  data: T[];
  total: number;
}

export interface MFLyricsResponse {
  lyrics: string;
}

export interface MFLyricsSyncLine {
  timestamp: string;
  text: string;
  milliseconds: number;
  duration: number;
}

export interface MFLyricsSyncResponse {
  lyrics: MFLyricsSyncLine[];
}

export interface MFLyricsTranslatedLine {
  timestamp: string;
  text: string;
  milliseconds: number;
  duration: number;
  translation: string;
}

export interface MFLyricsTranslatedResponse {
  lyrics: MFLyricsTranslatedLine[];
}

export interface MFAnalysisResponse {
  analysis: string;
}
