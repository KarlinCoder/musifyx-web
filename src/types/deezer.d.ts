export type DeezerUrl = string;
export type DeezerDate = string;

export interface DeezerArtist {
  id: number;
  name: string;
  link: DeezerUrl;
  share: DeezerUrl;
  picture: DeezerUrl;
  picture_small: DeezerUrl;
  picture_medium: DeezerUrl;
  picture_big: DeezerUrl;
  picture_xl: DeezerUrl;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: DeezerUrl;
  type: string;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  link: DeezerUrl;
  share: DeezerUrl;
  cover: DeezerUrl;
  cover_small: DeezerUrl;
  cover_medium: DeezerUrl;
  cover_big: DeezerUrl;
  cover_xl: DeezerUrl;
  label: string;
  nb_tracks: number;
  duration: number;
  fans: number;
  release_date: DeezerDate;
  record_type: string;
  available: boolean;
  tracklist: DeezerUrl;
  explicit_lyrics: boolean;
  explicit_content_lyrics: number;
  explicit_content_cover: number;
  artist: DeezerArtist;
  tracks: DeezerPagedResponse<DeezerTrack>;
  type: string;
}

export interface DeezerTrack {
  id: number;
  readable: boolean;
  title: string;
  title_short: string;
  title_version: string;
  link: DeezerUrl;
  duration: number;
  rank: number;
  explicit_lyrics: boolean;
  preview: DeezerUrl;
  artist: DeezerArtist;
  album: DeezerAlbum;
}

export interface DeezerTrackWithPosition extends DeezerTrack {
  position: number;
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  description: string;
  duration: number;
  public: boolean;
  is_loved_track: boolean;
  collaborative: boolean;
  nb_tracks: number;
  fans: number;
  add_date: string;
  mod_date: string;
  link: DeezerUrl;
  share: DeezerUrl;
  picture: DeezerUrl;
  picture_small: DeezerUrl;
  picture_medium: DeezerUrl;
  picture_big: DeezerUrl;
  picture_xl: DeezerUrl;
  checksum: string;
  tracklist: DeezerUrl;
  creator: DeezerUser;
  tracks: DeezerPagedResponse<DeezerPlaylistTrack>;
  type: string;
}

export interface DeezerPlaylistTrack extends DeezerTrack {
  time_add: number;
  unseen: boolean;
}

export interface DeezerUser {
  id: number;
  name: string;
  link: DeezerUrl;
  picture: DeezerUrl;
  picture_small: DeezerUrl;
  picture_medium: DeezerUrl;
  picture_big: DeezerUrl;
  picture_xl: DeezerUrl;
  tracklist: DeezerUrl;
  type: string;
}

export interface DeezerChart {
  tracks: DeezerPagedResponse<DeezerTrackWithPosition>;
  albums: DeezerPagedResponse<DeezerAlbum & { position: number }>;
  artists: DeezerPagedResponse<DeezerArtist & { position: number }>;
  playlists: DeezerPagedResponse<DeezerPlaylist & { position: number }>;
}

export interface DeezerPagedResponse<T> {
  data: T[];
  total: number;
}

export type DeezerSearchTracksResults = DeezerPagedResponse<DeezerTrack>;
export type DeezerSearchArtistsResults = DeezerPagedResponse<DeezerArtist>;
export type DeezerSearchAlbumsResults = DeezerPagedResponse<DeezerAlbum>;
export type DeezerSearchPlaylistsResults = DeezerPagedResponse<DeezerPlaylist>;
