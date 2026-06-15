"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiUser2Fill } from "react-icons/ri";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import SectionTitle from "@/components/section-title";
import ArtistCard from "@/components/artist-card";
import { searchArtist } from "../../services/deezer";
import { MFArtist, MFSearch } from "../../_types/musify";

export default function ArtistPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [data, setData] = useState<MFSearch<MFArtist> | null>(null);
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
        const result = await searchArtist(searchQuery);
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
      <SearchBar placeholder="Escribe el nombre de alguna banda o artista." />

      <div className="grid-results">
        {!searchQuery ? (
          <PlaceholderPageGreeting
            icon={RiUser2Fill}
            message="Comienza a buscar artistas o preguntale a la IA."
            title="Explora álbumes."
          />
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <SearchError error={error.message} />
        ) : !parsedData || parsedData.length === 0 ? (
          <NoResults query={searchQuery} />
        ) : (
          <div className="p-grid size-full">
            <SectionTitle>Se encontraron {data?.total} artistas</SectionTitle>

            <div className="relative grid grid-cols-5 w-full pb-10">
              {parsedData.map((artist) => (
                <ArtistCard
                  key={crypto.randomUUID()}
                  info={{
                    id: artist.id,
                    name: artist.name,
                    coverUrl: artist.image_url,
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
