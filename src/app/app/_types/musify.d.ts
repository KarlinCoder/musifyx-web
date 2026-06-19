export interface MFTrack {
  id: number;
  title: string;
  artists: MFArtist[];
  image_url: string;
  duration_ms: number;
  explicit_lyrics: boolean;
}

export interface MFArtist {
  id: number;
  name: string;
  image_url: string;
}

export interface MFArtistPage extends MFArtist {
  nb_albums: number;
  bio_html: string;
}

export interface MFAlbum {
  id: number;
  title: string;
  image_url: string;
  artist: MFArtist;
  record_type: string;
  explicit_lyrics: boolean;
}

export interface MFAlbumPage extends MFAlbum {
  duration: number;
  label: string;
  copyright: string;
  release_date: string;
  nb_tracks: number;
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
  nb_fans: number;
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
