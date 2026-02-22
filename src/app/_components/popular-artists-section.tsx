import { RiUser2Fill } from "react-icons/ri";
import Hr from "@/components/hr";
import { DeezerArtist } from "@/types/deezer/types";
import ArtistCard from "@/components/artist-card";

interface Props {
  artists: DeezerArtist[];
}

export default function PopularArtistsSection({ artists }: Props) {
  return (
    <div className="mt-8" id="artistas">
      <p className="text-lg flex items-center gap-2">
        <RiUser2Fill /> Artistas populares
      </p>

      <Hr className="mb-4 mt-3" />

      <div className="grid grid-cols-5 gap-3 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {artists.map((item) => {
          return (
            <ArtistCard
              key={item.id}
              coverUrl={item.picture_big!}
              id={item.id}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
