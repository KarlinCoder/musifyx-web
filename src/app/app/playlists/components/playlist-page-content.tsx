"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiPlayList2Line } from "react-icons/ri";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { searchPlaylists } from "../../services/deezer";
import SectionTitle from "@/components/section-title";
import { Playlist, SearchResponse } from "../../_types/deezer";
import PlaylistCard from "@/components/playlist-card";

export default function SongsPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [data, setData] = useState<SearchResponse<Playlist> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const fetchTracks = async () => {
      setIsLoading(true);
      setError(null);
      setData(null);

      try {
        const result = await searchPlaylists(searchQuery);
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Ocurrió un error al buscar"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [searchQuery]);

  const parsedData = data?.data.filter((item) => item.id);

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de alguna playlist." />

      <div className="grid-results">
        {!searchQuery ? (
          <PlaceholderPageGreeting
            icon={RiPlayList2Line}
            message="Comienza a buscar playlists o preguntale a la IA."
            title="Explora listas."
          />
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <SearchError error={error.message} />
        ) : !parsedData || parsedData.length === 0 ? (
          <NoResults query={searchQuery} />
        ) : (
          <div className="p-grid size-full">
            <SectionTitle>Se encontraron {data?.total} playlists</SectionTitle>

            <div className="relative grid grid-cols-5 w-full pb-10">
              {parsedData.map((playlist) => (
                <PlaylistCard
                  key={crypto.randomUUID()}
                  info={{
                    id: playlist.id,
                    isOfficial: playlist.is_official,
                    nb_tracks: playlist.nb_tracks,
                    picture: playlist.image_url,
                    title: playlist.title,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
