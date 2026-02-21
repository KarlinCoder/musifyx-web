export interface DeezerArtist {
  id: number;
  name: string;
  link?: string;
  share?: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
  nb_album?: number;
  nb_fan?: number;
  radio?: boolean;
  tracklist?: string;
}

export interface DeezerAlbum {
  id: number;
  title: string;
  upc?: string;
  link?: string;
  share?: string;
  cover?: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  md5_image?: string;
  genre_id?: number;
  genres?: DeezerGenre[]; // Puedes tipar mejor si lo necesitas
  label?: string;
  provider?: string;
  nb_tracks?: number;
  duration?: number;
  fans?: number;
  release_date?: string;
  record_type?: string;
  available?: boolean;
  explicit_lyrics?: boolean;
  explicit_content_lyrics?: number;
  explicit_content_cover?: number;
  artist?: DeezerArtist;
  tracks?: { data: DeezerTrack[] };
}

export interface DeezerTrack {
  id: number;
  readable?: boolean;
  title: string;
  title_short?: string;
  title_version?: string;
  isrc?: string;
  link?: string;
  share?: string;
  duration: number;
  rank?: number;
  explicit_lyrics?: boolean;
  preview: string;
  bpm?: number;
  gain?: number;
  release_date?: string;
  track_position?: number;
  disk_number?: number;
  artist: DeezerArtist;
  album: DeezerAlbum;
  available_countries?: string[];
}

export interface DeezerPlaylist {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  public: boolean;
  is_loved_track?: boolean;
  collaborative?: boolean;
  nb_tracks: number;
  unseen_track_count?: number;
  fans?: number;
  link?: string;
  share?: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
  checksum?: string;
  creator?: { id: number; name: string };
  tracks: { data: DeezerTrack[] };
}

export interface DeezerGenre {
  id: number;
  name: string;
  picture?: string;
  picture_small?: string;
  picture_medium?: string;
  picture_big?: string;
  picture_xl?: string;
}

export interface DeezerChartItem<T> {
  position: number;
  data: T;
}

export interface DeezerCharts {
  tracks: { data: DeezerChartItem<DeezerTrack>[] };
  albums: { data: DeezerChartItem<DeezerAlbum>[] };
  artists: { data: DeezerChartItem<DeezerArtist>[] };
  playlists: { data: DeezerChartItem<DeezerPlaylist>[] };
}
