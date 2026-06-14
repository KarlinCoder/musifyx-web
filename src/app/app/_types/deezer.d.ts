export interface SearchResponse<T> {
  data: T[];
  total: number;
}

export interface Track {
  id: number;
  title: string;
  artists: Artist[];
  image_url: string;
  duration: number;
  explicit_lyrics: boolean;
}

export interface Artist {
  id: number;
  name: string;
  image_url: string;
}

export interface ArtistFull extends Artist {
  banner_picture: string;
  nb_album: number;
  bio_html: string;
}

export interface ArtistAlbum {
  id: number;
  title: string;
  image_url: string;
  release_date: string;
  explicit_lyrics: boolean;
  record_type: string;
}

export interface Album {
  id: number;
  title: string;
  artist: Artist;
  image_url: string;
  record_type: string;
  explicit_lyrics: boolean;
}

export interface AlbumFull extends Album {
  nb_tracks: number;
  duration: number;
  release_date: Date;
  copyright: string;
  label: string;
  tracks: Track[];
}

export interface Playlist {
  id: number;
  title: string;
  image_url: string;
  nb_tracks: number;
  is_official: boolean;
}

export interface PlaylistFull extends Playlist {
  description: string;
  duration: number;
  nb_fans: number;
  add_date: Date;
  mod_date: Date;
  picture: string;
  tracks: Track[];
}

export interface PopularNow {
  tracks: {
    data: Track[];
    total: number;
  };
  albums: {
    data: Album[];
    total: number;
  };
  artists: {
    data: Artist[];
    total: number;
  };
  playlists: {
    data: Playlist[];
    total: number;
  };
}
