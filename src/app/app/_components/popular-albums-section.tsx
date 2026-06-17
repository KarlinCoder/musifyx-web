import AlbumCard from "@/components/album-card";
import SectionTitle from "@/components/section-title";
import { MFAlbum } from "../_types/musify";

interface Props {
  albums: MFAlbum[];
}

export default function PopularAlbumsSection({ albums }: Props) {
  return (
    <div id="albumes">
      <SectionTitle>Álbums populares</SectionTitle>

      <div className="grid grid-cols-5 gap-2 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {albums.map((item) => {
          return (
            <AlbumCard
              key={item.id}
              info={{
                artistName: item.artist.name,
                coverUrl: item.image_url,
                hasExplicitLyrics: item.explicit_lyrics,
                id: item.id,
                recordType: "",
                title: item.title,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
