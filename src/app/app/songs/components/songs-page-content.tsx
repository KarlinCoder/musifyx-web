"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiMusic2Line } from "react-icons/ri";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { searchTracks } from "../../services/deezer";
import SectionTitle from "@/components/section-title";
import TrackCard from "@/components/track-card";
import { MFSearch, MFTrack } from "../../_types/musify";

export default function SongsPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [data, setData] = useState<MFSearch<MFTrack> | null>(null);
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
        const result = await searchTracks(searchQuery);
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
      <SearchBar placeholder="Escribe el nombre de alguna canción." />

      <div className="grid-results">
        {!searchQuery ? (
          <PlaceholderPageGreeting
            icon={RiMusic2Line}
            message="Comienza a buscar canciones o preguntale a la IA."
            title="Explora canciones."
          />
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <SearchError error={error.message} />
        ) : !parsedData || parsedData.length === 0 ? (
          <NoResults query={searchQuery} />
        ) : (
          <div className="p-grid size-full">
            <SectionTitle>Se encontraron {data?.total} canciones</SectionTitle>

            <div className="relative flex flex-col w-full pb-10">
              {parsedData.map((track) => {
                console.log(track);

                return (
                  <TrackCard
                    key={track.id}
                    data={{
                      id: track.id,
                      artists: track.artists,
                      image_url: track.image_url,
                      duration: track.duration_ms,
                      explicit_lyrics: track.explicit_lyrics,
                      title: track.title,
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
