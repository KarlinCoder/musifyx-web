import Hr from "@/components/hr";
import {
  formatDateToSpanish,
  formatSecondsToMinutes,
  genericBlur,
} from "@/lib/utils";
import { getAverageColor } from "fast-average-color-node";
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { Metadata } from "next";
import { getPlaylist } from "../../services/deezer";
import TrackCard from "@/components/track-card";

type Params = Promise<{ playlistId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { playlistId } = await params;

  // Fetch minimal playlist data for metadata
  let playlistTitle = "Playlist";
  let playlistPicture = "/og-default.jpg";
  let trackCount = 0;
  let fansCount = 0;

  try {
    const playlist = await getPlaylist(parseInt(playlistId));
    playlistTitle = playlist.title;
    playlistPicture = playlist.image_url || "/og-default.jpg";
    trackCount = playlist.nb_tracks || playlist.tracks.length || 0;
    fansCount = playlist.nb_fans || 0;
  } catch (error) {
    console.error(`Error fetching playlist ${playlistId} for meta`, error);
  }

  const seoDescription = `${playlistTitle} - ${trackCount} canciones y ${fansCount.toLocaleString("en-US")} fans. Descarga esta playlist completa en alta calidad con Musify. Metadatos perfectos, portadas originales y letras integradas.`;

  return {
    title: `${playlistTitle} | Playlist - Musify`,
    description: seoDescription,
    keywords: [
      playlistTitle,
      `descargar ${playlistTitle}`,
      `playlist ${playlistTitle}`,
      `${trackCount} canciones`,
      "descargar playlist",
      "lista de reproducción",
      "alta calidad",
      "Musify",
      "metadatos musicales",
      "colección de música",
      "playlist oficial",
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
      canonical: `/playlists/${playlistId}`,
    },
    openGraph: {
      title: `${playlistTitle} | Playlist`,
      description: seoDescription,
      url: `/playlists/${playlistId}`,
      siteName: "Musify",
      images: [
        {
          url: playlistPicture,
          width: 1000,
          height: 1000,
          alt: `${playlistTitle} - Playlist`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${playlistTitle} | Playlist`,
      description: seoDescription,
      images: [playlistPicture],
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

export default async function PlaylistIdPage({
  params,
}: {
  params: Promise<{ playlistId: string }>;
}) {
  const { playlistId } = await params;

  const playlist = await getPlaylist(parseInt(playlistId));

  console.log(playlist.image_url);

  const avgColor = (await getAverageColor(playlist.image_url)).hex || "#eee";

  return (
    <div
      style={{
        background: `radial-gradient(circle 550px at 50% -40%, ${avgColor}, transparent)`,
      }}
      className="size-full"
    >
      <div className="max-w-300 mx-auto w-full p-10 space-y-20">
        <header className={`flex items-center gap-5 w-full `}>
          <div className="max-w-65 w-full shadow-2xl shadow-background">
            <Image
              alt="album cover"
              src={playlist.image_url || "/not-loaded.jpg"}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL={genericBlur}
              className="w-full rounded-sm"
            />
          </div>

          <div>
            <h2 className="font-primary text-5xl space-y-2 font-medium flex items-center gap-2">
              {playlist.title}
            </h2>

            <p className="flex items-center gap-1 text-sm my-2 font-semibold">
              <RiVerifiedBadgeFill size={20} className="text-blue-400" />{" "}
              Oficial de Deezer
            </p>

            <div className="mt-1 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <p>{playlist.nb_tracks} canciones</p>
                {"|"}
                <p>{formatSecondsToMinutes(playlist.duration)} </p>
                {"|"}
                <p>{playlist.nb_fans} fans</p>
              </div>

              <p>Actualizada el {formatDateToSpanish(playlist.mod_date)}</p>
              <Hr className="my-3" />
              <p className="text-balance">{playlist.description}</p>
            </div>
          </div>
        </header>

        <main className="p-10s">
          <p className="artist-section-title">Canciones:</p>

          <div className="flex flex-col relative pb-8">
            {playlist.tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                data={{
                  artists: track.artists,
                  duration: track.duration_ms,
                  explicit_lyrics: track.explicit_lyrics,
                  id: track.id,
                  image_url: track.image_url,
                  title: track.title,
                }}
                listPosition={index + 1}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
