import AlbumCard from "@/components/album-card";
import { capitalize } from "@/lib/utils";
import { getArtist, getArtistAlbums } from "@/services/deezer";

export default async function ArtistDiscographyPage({
  params,
}: {
  params: Promise<{ artistId: number }>;
}) {
  const { artistId } = await params;

  const [artist, { data: artistAlbums }] = await Promise.all([
    getArtist(artistId),
    getArtistAlbums(artistId),
  ]);

  const albumTypes = () => {
    const albumTypesSet = new Set<string>();
    artistAlbums.forEach((item) => albumTypesSet.add(item.record_type));

    return Array.from(albumTypesSet);
  };

  const discographySections = () => {
    return albumTypes().map((type) => ({
      type,
      albums: artistAlbums.filter((album) => album.record_type === type),
    }));
  };

  return (
    <div>
      {discographySections().map((section) => {
        return (
          <div key={section.type} className="mb-10">
            <h2 className="artist-section-title">
              {capitalize(section.type)}s
            </h2>

            <div className="grid grid-cols-5">
              {section.albums.map((album) => (
                <AlbumCard
                  key={album.id}
                  artistId={artist.id}
                  artistName={artist.name}
                  coverUrl={album.cover_big}
                  hasExplicitLyrics={album.explicit_lyrics}
                  id={album.id}
                  recordType={album.record_type}
                  title={album.title}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
