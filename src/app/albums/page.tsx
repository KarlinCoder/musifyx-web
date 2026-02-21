"use client";

import Loader from "@/components/loader";
import NoResults from "@/components/no-results";
import SearchError from "@/components/search-error";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import useDeezerSearch from "@/hooks/useDeezerSearch";
import { genericBlur } from "@/lib/utils";
import { searchAlbums } from "@/services/deezer";
import { DeezerAlbum } from "@/types/deezer/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RiAlbumLine } from "react-icons/ri";
import SearchBar from "@/components/search-bar"; // 👈 Añadido

export default function AlbumsPage() {
  const searchQuery = useSearchParams().get("search");

  const { data, error, isLoading } = useDeezerSearch<DeezerAlbum>(
    searchAlbums,
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
        <div className="grid grid-cols-5 gap-3 p-7">
          {data.map((albumItem) => (
            <Link
              href={`/albums/${albumItem.id}`}
              key={albumItem.id}
              className="inline-block rounded-lg overflow-hidden hover:bg-background-light transition-all cursor-pointer hover:scale-102 h-fit duration-100"
            >
              <div className="relative">
                <Image
                  placeholder="blur"
                  blurDataURL={genericBlur}
                  width={100}
                  height={100}
                  src={albumItem.cover_medium || ""}
                  alt={`"${albumItem.title}" de ${
                    albumItem.artist?.name || "[SIN ARTISTA]"
                  }`}
                  className="w-full aspect-square"
                />

                {albumItem.explicit_lyrics && (
                  <span className="text-xs bg-background/70 rounded-md absolute bottom-2 left-2 size-6 grid place-content-center">
                    E
                  </span>
                )}

                <span className="text-xs bg-background/70 rounded-md absolute bottom-2 right-2 p-1 grid place-content-center uppercase">
                  {albumItem.record_type}
                </span>
              </div>

              <div className="p-3 -space-y-0.5">
                <p className="font-primary text-[15px] font-medium">
                  {albumItem.title}
                </p>
                <Link
                  href={`/artists/${albumItem.artist?.id}`}
                  className="block text-text-muted text-[13px] hover:underline underline-offset-2"
                >
                  {albumItem.artist?.name}
                </Link>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
