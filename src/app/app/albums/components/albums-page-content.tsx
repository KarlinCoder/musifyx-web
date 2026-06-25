"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RiAlbumFill } from "react-icons/ri";

import PlaceholderPageGreeting from "@/app/app/_components/placeholder-page-greeting";
import SearchError from "@/app/app/_components/search-error";
import NoResults from "@/app/app/_components/no-results";
import Loader from "@/app/app/_components/loader";
import SearchBar from "@/app/app/_components/search-bar";
import { searchAlbums } from "../../_services/musify";
import { MFAlbum, MFSearch } from "../../_types/musify";
import AlbumCard from "@/app/app/_components/album-card";

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
            <p className="text-lg px-2 text-white/80">
              Se encontraron {data?.total} álbumes.
            </p>

            <div className="relative grid grid-cols-5 w-full pb-10">
              {parsedData.map((album) => (
                <AlbumCard
                  key={crypto.randomUUID()}
                  info={{
                    id: album.id,
                    artistName: album.artist.name,
                    coverUrl: album.image_url,
                    hasExplicitLyrics: album.explicit_lyrics,
                    recordType: album.record_type,
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
