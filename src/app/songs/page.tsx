"use client";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import { useSearchParams } from "next/navigation";
import { RiMusic2Line } from "react-icons/ri";
import TrackCard from "../../components/track-card";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { DeezerTrack } from "@/types/deezer";
import { searchTracks } from "@/services/deezer";
import useDeezerSearch from "@/hooks/useDeezerSearch";

export default function SongsPage() {
  const searchQuery = useSearchParams().get("search");

  const { data, error, isLoading } = useDeezerSearch<DeezerTrack>(
    searchTracks,
    {
      query: searchQuery,
      limit: 50,
    },
  );

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de alguna canción." />

      <div className="p-8 h-full">
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
        ) : data.length === 0 ? (
          <NoResults query={searchQuery} />
        ) : (
          <div className="flex flex-col w-full">
            <p className="mb-5 font-primary text-2xl font-medium">
              Resultados para {`"${searchQuery}"`}
            </p>

            {data.map((track) => (
              <TrackCard
                key={track.id}
                title={track.title}
                artistId={track.artist.id}
                artistName={track.artist.name}
                coverUrl={track.album.cover_medium}
                duration={track.duration}
                id={track.id}
                previewUrl={track.preview}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
