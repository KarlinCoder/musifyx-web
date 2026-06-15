export interface MusifySearchResponse<T> {
  data: T[];
  total: number;
}

export interface MusifyTrack {
  id: number;
  title: string;
  artists: MusifyArtist[];
  image_url: string;
  duration: number;
  explicit_lyrics: boolean;
}

export interface MusifyArtist {
  id: number;
  name: string;
  image_url: string;
}

export interface MusifyArtistFull extends MusifyArtist {
  banner_picture: string;
  nb_album: number;
  bio_html: string;
}

export interface MusifyArtistAlbum {
  id: number;
  title: string;
  image_url: string;
  release_date: string;
  explicit_lyrics: boolean;
  record_type: string;
}

export interface MusifyAlbum {
  id: number;
  title: string;
  artist: MusifyArtist;
  image_url: string;
  record_type: string;
  explicit_lyrics: boolean;
}

export interface MusifyAlbumFull extends MusifyAlbum {
  nb_tracks: number;
  duration: number;
  release_date: Date;
  copyright: string;
  label: string;
  tracks: MusifyTrack[];
}

export interface MusifyPlaylist {
  id: number;
  title: string;
  image_url: string;
  nb_tracks: number;
  is_official: boolean;
}

export interface MusifyPlaylistFull extends MusifyPlaylist {
  description: string;
  duration: number;
  nb_fans: number;
  add_date: Date;
  mod_date: Date;
  picture: string;
  tracks: MusifyTrack[];
}

export interface MusifyPopularNow {
  tracks: MusifyTrack[];
  albums: MusifyAlbum[];
  artists: MusifyArtist[];
  playlists: MusifyPlaylist[];
}
