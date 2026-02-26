"use client";

import Loader from "@/components/loader";
import NoResults from "@/components/no-results";
import SearchError from "@/components/search-error";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import useDeezerSearch from "@/hooks/useDeezerSearch";
import { useSearchParams } from "next/navigation";
import { RiAlbumLine } from "react-icons/ri";
import SearchBar from "@/components/search-bar"; // 👈 Añadido
import AlbumCard from "@/components/album-card";
import { searchAlbums } from "@/services/deezer";
import { DeezerAlbum } from "@/types/deezer";

export default function AlbumsPage() {
  const searchQuery = useSearchParams().get("search");

  const { data, error, isLoading } = useDeezerSearch<DeezerAlbum>(
    searchAlbums,
    {
      query: searchQuery,
      limit: 50,
    },
  );

  return (
    <>
      <SearchBar placeholder="Escribe el nombre de algún álbum o EP." />

      {!searchQuery ? (
        <PlaceholderPageGreeting
          icon={RiAlbumLine}
          message="Comienza a buscar álbumes o preguntale a la IA."
          title="Explora álbumes."
        />
      ) : isLoading ? (
        <Loader />
      ) : searchQuery.length === 0 ? (
        <NoResults query={searchQuery} />
      ) : error ? (
        <SearchError error={error} />
      ) : (
        <div className="grid grid-cols-5 p-7">
          {data.map((albumItem) => (
            <AlbumCard
              key={albumItem.id}
              id={albumItem.id}
              artistId={albumItem.artist!.id}
              artistName={albumItem.artist!.name}
              coverUrl={albumItem.cover_big!}
              hasExplicitLyrics={albumItem.explicit_lyrics!}
              recordType={albumItem.record_type!}
              title={albumItem.title}
            />
          ))}
        </div>
      )}
    </>
  );
}
