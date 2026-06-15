import DownloadButton from "@/components/download-button";
import Hr from "@/components/hr";
import TrackCard from "@/components/track-card";
import {
  formatDateToSpanish,
  formatSecondsToMinutes,
  genericBlur,
} from "@/lib/utils";
import { getAverageColor } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAlbum } from "../../services/deezer";

type Params = Promise<{ albumId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { albumId } = await params;

  let albumTitle = "Álbum";
  let artistName = "Artista";
  let albumCover = "/og-default.jpg";
  let releaseYear = new Date().getFullYear();
  let trackCount = 0;
  let label = "";

  try {
    const album = await getAlbum(parseInt(albumId));
    albumTitle = album.title;
    artistName = album.artist.name;
    albumCover = album.image_url;
    releaseYear = album.release_date
      ? new Date(album.release_date).getFullYear()
      : new Date().getFullYear();
    trackCount = album.nb_tracks;
    label = album.label;
  } catch (error) {
    console.error(`Error fetching album ${albumId} for meta`, error);
  }

  const description = `Escucha y descarga "${albumTitle}" de ${artistName} (${releaseYear}) en Musify. ${trackCount} canciones en alta calidad con metadatos perfectos, portada original y letras integradas. ${label ? label : ""}`;

  return {
    title: `${albumTitle} | ${artistName} - Musify`,
    description,
    keywords: [
      albumTitle,
      artistName,
      `descargar ${albumTitle}`,
      `${artistName} ${albumTitle}`,
      `${albumTitle} ${releaseYear}`,
      "descargar álbum",
      "alta calidad",
      "Musify",
      "metadatos musicales",
      "colección de música",
    ],
    authors: [{ name: "KarlinCoder", url: "https://musify.karlincoder.com" }],
    creator: "KarlinCoder",
    publisher: "Musify",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://musify.karlincoder.com"),
    alternates: {
      canonical: `/albumes/${albumId}`,
    },
    openGraph: {
      title: `${albumTitle} | ${artistName}`,
      description,
      url: `/albumes/${albumId}`,
      siteName: "Musify",
      images: [
        {
          url: albumCover,
          width: 1000,
          height: 1000,
          alt: `${albumTitle} - ${artistName}`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${albumTitle} | ${artistName}`,
      description,
      images: [albumCover],
      creator: "@KarlinCoder",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "Música",
  };
}

export default async function AlbumIdPage({
  params,
}: {
  params: Promise<{ albumId: string }>;
}) {
  const { albumId } = await params;
  const album = await getAlbum(parseInt(albumId));
  const avgColor = (await getAverageColor(album.image_url)) || "#eee";

  return (
    <div
      style={{
        background: `radial-gradient(circle 550px at 50% -20%, ${avgColor}, transparent)`,
      }}
      className="size-full p-8 max-w-300 mx-auto"
    >
      <div className="mx-auto w-full">
        <header className={`flex items-center gap-5 w-full py-17`}>
          <div className="max-w-65 w-full shadow-2xl shadow-background">
            <Image
              alt="album cover"
              src={album.image_url || "/not-loaded.jpg"}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={genericBlur}
              className="w-full"
            />
          </div>

          <div>
            <h2 className="font-primary text-5xl space-y-2 font-medium">
              {album.title}
            </h2>

            <div className="flex items-center gap-2 mt-4">
              <Image
                src={album.artist.image_url || "/not-loaded.jpg"}
                alt="artist picture"
                width={70}
                height={70}
                className="size-7 rounded-full"
              />
              <Link
                href={`/artists/${album.artist.id}`}
                className="block text-base text-neutral-300 hover:underline underline-offset-2 "
              >
                {album.artist.name}
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm text-neutral-400">
              <p>{album.nb_tracks} canciones</p>
              {"|"}
              <p>{formatSecondsToMinutes(album.duration)} minutos</p>
              {"|"}
              <p>Lanzado el {formatDateToSpanish(album.release_date!)}</p>
            </div>

            <DownloadButton id={parseInt(albumId)}>
              Descargar álbum
            </DownloadButton>
          </div>
        </header>

        <main className="pb-10">
          <p className="artist-section-title">Canciones:</p>

          <div className="flex flex-col">
            {album.tracks.map((item, index) => {
              return (
                <TrackCard
                  key={item.id}
                  data={{
                    artists: item.artists,
                    duration: item.duration_ms,
                    explicit_lyrics: item.explicit_lyrics,
                    id: item.id,
                    image_url: item.image_url,
                    title: item.title,
                  }}
                  listPosition={index + 1}
                />
              );
            })}
          </div>

          <Hr className="my-4" />

          <footer>
            <p className="text-text-muted text-sm">{album.copyright}</p>
            <p className="text-text-muted text-sm">
              © {new Date(album.release_date).getFullYear()} {album.label}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
