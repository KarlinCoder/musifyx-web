"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiAlbumFill } from "react-icons/ri";

import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import SearchError from "@/components/search-error";
import NoResults from "@/components/no-results";
import Loader from "@/components/loader";
import SearchBar from "@/components/search-bar";
import { searchAlbums } from "../../services/deezer";
import SectionTitle from "@/components/section-title";
import { MFAlbum, MFSearch } from "../../_types/musify";
import AlbumCard from "@/components/album-card";

export default function SongsPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [data, setData] = useState<MFSearch<MFAlbum> | null>(null);
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
        const result = await searchAlbums(searchQuery);
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
      <SearchBar placeholder="Escribe el nombre de algún álbum o EP." />

      <div className="grid-results">
        {!searchQuery ? (
          <PlaceholderPageGreeting
            icon={RiAlbumFill}
            message="Comienza a buscar álbumes o preguntale a la IA."
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
            <SectionTitle>Se encontraron {data?.total} álbumes</SectionTitle>

            <div className="relative grid grid-cols-5 w-full pb-10">
              {parsedData.map((album) => (
                <AlbumCard
                  key={crypto.randomUUID()}
                  info={{
                    id: album.id,
                    artistName: album.artist.name,
                    coverUrl: album.image_url,
                    hasExplicitLyrics: album.explicit_lyrics,
                    recordType: "",
                    title: album.title,
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
