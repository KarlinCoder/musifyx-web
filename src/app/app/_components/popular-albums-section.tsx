import AlbumCard from "@/components/album-card";
import SectionTitle from "@/components/section-title";
import { Album } from "../_types/deezer";

interface Props {
  albums: Album[];
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
              info={{
                artistId: item.id,
                artistName: item.artist.name,
                coverUrl: item.image_url,
                hasExplicitLyrics: item.explicit_lyrics,
                id: item.id,
                recordType: item.record_type,
                title: item.title,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
