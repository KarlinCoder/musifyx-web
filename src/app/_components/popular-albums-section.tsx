import AlbumCard from "@/components/album-card";
import SectionTitle from "@/components/section-title";
import { DeezerAlbum } from "@/types/deezer";

interface Props {
  albums: DeezerAlbum[];
}

export default function PopularAlbumsSection({ albums }: Props) {
  return (
    <div id="albumes">
      <SectionTitle>Álbums populares</SectionTitle>

      <div className="grid grid-cols-5 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {albums.map((item) => {
          return (
            <AlbumCard
              key={item.id}
              recordType={item.record_type!}
              hasExplicitLyrics={item.explicit_lyrics!}
              title={item.title}
              artistId={item.artist!.id}
              artistName={item.artist!.name}
              coverUrl={item.cover_medium!}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
