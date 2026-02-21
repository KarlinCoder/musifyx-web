"use client";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import { searchTracks } from "@/services/deezer";
import { DeezerTrack } from "@/types/deezer/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiMusic2Line } from "react-icons/ri";
import TrackCard from "./_components/track-card";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar"; // 👈 Asegúrate de la ruta correcta

export default function SongsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<DeezerTrack[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = useSearchParams().get("search");

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) {
        setSearchResults([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const { data } = await searchTracks(searchQuery, { limit: 50 });
        setSearchResults(data);
      } catch (err) {
        console.error("Error fetching tracks:", err);
        setError("No se pudieron cargar las canciones.");
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de alguna canción." />

      {!searchQuery ? (
        <PlaceholderPageGreeting
          icon={RiMusic2Line}
          message="Comienza a buscar canciones o preguntale a la IA."
          title="Explora canciones."
        />
      ) : isLoading ? (
        <Loader />
      ) : error ? (
        <SearchError error={error} />
      ) : searchResults.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : (
        <div className="flex flex-col w-full">
          {searchResults.map((track) => (
            <TrackCard
              key={track.id}
              title={track.title}
              artist={track.artist} // Asumiendo que track.artist es un objeto
              coverUrl={track.album.cover_medium}
              duration={track.duration}
              id={track.id}
              previewUrl={track.preview}
            />
          ))}
        </div>
      )}
    </>
  );
}
