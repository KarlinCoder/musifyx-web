import { RiUser2Fill } from "react-icons/ri";
import Hr from "@/components/hr";
import { DeezerArtist } from "@/types/deezer/types";
import ArtistCard from "@/components/artist-card";

interface Props {
  songs: DeezerArtist[];
}

export default function PopularArtistsSection({ songs }: Props) {
  return (
    <div className="mt-8">
      <p className="text-lg flex items-center gap-2">
        <RiUser2Fill /> Albums populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-2 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {songs.map((item) => {
          return (
            <ArtistCard
              key={item.id}
              coverUrl={item.picture_medium!}
              id={item.id}
              listeners={item.nb_fan!}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
