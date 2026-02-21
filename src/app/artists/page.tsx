"use client";

import Loader from "@/components/loader";
import NoResults from "@/components/no-results";
import SearchError from "@/components/search-error";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import useDeezerSearch from "@/hooks/useDeezerSearch";
import { searchArtists } from "@/services/deezer";
import { DeezerArtist } from "@/types/deezer/types";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/search-bar"; // 👈 Añadido
import { RiUser2Line } from "react-icons/ri";
import ArtistCard from "@/components/artist-card";

export default function ArtistsPage() {
  const searchQuery = useSearchParams().get("search");

  const { data, error, isLoading } = useDeezerSearch<DeezerArtist>(
    searchArtists,
    {
      query: searchQuery,
      limit: 50,
    }
  );

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de algún álbum o EP." />

      {!searchQuery ? (
        <PlaceholderPageGreeting
          icon={RiUser2Line}
          message="Comienza a buscar artistas o preguntale a la IA."
          title="Explora artistas."
        />
      ) : isLoading ? (
        <Loader />
      ) : searchQuery.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : error ? (
        <SearchError error={error} />
      ) : (
        <div className="grid grid-cols-5 gap-3 p-7">
          {data.map((artistItem) => (
            <ArtistCard
              key={artistItem.id}
              coverUrl={artistItem.picture_big!}
              id={artistItem.id}
              name={artistItem.name}
            />
          ))}
        </div>
      )}
    </>
  );
}
