import { RiAlbumFill } from "react-icons/ri";
import Hr from "@/components/hr";
import { DeezerAlbum } from "@/types/deezer/types";
import AlbumCard from "@/components/album-card";

interface Props {
  songs: DeezerAlbum[];
}

export default function PopularAlbumsSection({ songs }: Props) {
  return (
    <div className="mt-8">
      <p className="text-lg flex items-center gap-2">
        <RiAlbumFill /> Albums populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-2 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {songs.map((item) => {
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
