import AlbumCard from "@/app/app/_components/album-card";
import BackButton from "@/app/app/_components/back-button";
import { capitalize } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtistDiscography, getArtist } from "../../_services/musify";
import { MFAlbum } from "../../_types/musify";

type Params = Promise<{ artistId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { artistId } = await params;

  let artistName = "Artista";
  let artistPicture = "/og-default.jpg";

  try {
    const artist = await getArtist(parseInt(artistId));
    artistName = artist.name;
    artistPicture = artist.image_url || "/og-default.jpg";
  } catch (error) {
    console.error(`Error fetching artist ${artistId} for metadata:`, error);
  }

  const description = `Explora la discografía completa de ${artistName} en Musify. Descarga sus álbumes en alta calidad con metadatos perfectos, portadas en HD y letras integradas.`;

  return {
    title: `${artistName} | Musify - Discografía y Descargas`,
    description,
    keywords: [
      artistName,
      `descargar ${artistName}`,
      `${artistName} discografía`,
      `${artistName} álbumes`,
      `${artistName} alta calidad`,
      "descargar música",
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
      canonical: `/artistas/${artistId}`,
    },
    openGraph: {
      title: `${artistName} | Musify`,
      description,
      url: `/artistas/${artistId}`,
      siteName: "Musify",
      images: [
        {
          url: artistPicture,
          width: 1000,
          height: 1000,
          alt: `${artistName} - Musify`,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${artistName} | Musify`,
      description,
      images: [artistPicture],
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

export default async function ArtistDiscographyPage({
  params,
}: {
  params: Promise<{ artistId: string }>;
}) {
  const { artistId } = await params;

  let artistInfo;
  let artistAlbums;

  try {
    [artistInfo, artistAlbums] = await Promise.all([
      getArtist(parseInt(artistId)),
      getArtistDiscography(parseInt(artistId)),
    ]);
  } catch {
    return notFound();
  }

  const albumTypes = () => {
    const albumTypesSet = new Set<string>();
    artistAlbums.forEach((item) => albumTypesSet.add(item.record_type));

    return Array.from(albumTypesSet);
  };

  const discographySections = (): { type: string; albums: MFAlbum[] }[] => {
    return albumTypes().map((type) => ({
      type,
      albums: artistAlbums.filter((album) => album.record_type === type),
    }));
  };

  console.log(discographySections());

  return (
    <div>
      <div className="flex justify-start p-8 pb-0">
        <BackButton />
      </div>
      {discographySections().map((section) => {
        console.log(section);

        return (
          <div key={section.type} className="mb-10">
            <h2 className="app-section-title">{capitalize(section.type)}s</h2>

            <div className="grid grid-cols-5">
              {section.albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  info={{
                    artistName: artistInfo.name,
                    coverUrl: album.image_url,
                    hasExplicitLyrics: album.explicit_lyrics,
                    id: album.id,
                    recordType: album.record_type,
                    title: album.title,
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
