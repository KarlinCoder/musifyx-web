"use client";

import Loader from "@/components/loader";
import NoResults from "@/components/no-results";
import SearchError from "@/components/search-error";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import useDeezerSearch from "@/hooks/useDeezerSearch";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/search-bar"; // 👈 Añadido
import { RiPlayList2Line } from "react-icons/ri";
import PlaylistCard from "@/components/playlist-card";
import { searchPlaylists } from "@/services/deezer";
import { DeezerPlaylist } from "@/types/deezer";

export default function PlaylistsPage() {
  const searchQuery = useSearchParams().get("search");

  const { data, error, isLoading } = useDeezerSearch<DeezerPlaylist>(
    searchPlaylists,
    {
      query: searchQuery,
      limit: 50,
    },
  );

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de alguna playlist." />

      {!searchQuery ? (
        <PlaceholderPageGreeting
          icon={RiPlayList2Line}
          message="Comienza a buscar playlists o preguntale a la IA."
          title="Explora playlists."
        />
      ) : isLoading ? (
        <Loader />
      ) : searchQuery.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : error ? (
        <SearchError error={error} />
      ) : (
        <div className="grid grid-cols-5 p-8">
          {data.map((playlistItem) => (
            <PlaylistCard
              key={playlistItem.id}
              coverUrl={playlistItem.picture_big!}
              title={playlistItem.title}
              id={playlistItem.id}
              totalSongs={playlistItem.nb_tracks}
              fans={playlistItem.fans!}
            />
          ))}
        </div>
      )}
    </>
  );
}
