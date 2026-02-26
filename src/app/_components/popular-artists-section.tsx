import ArtistCard from "@/components/artist-card";
import { DeezerArtist } from "@/types/deezer";
import SectionTitle from "@/components/section-title";

interface Props {
  artists: DeezerArtist[];
}

export default function PopularArtistsSection({ artists }: Props) {
  return (
    <div id="artistas">
      <SectionTitle>Artistas populares</SectionTitle>

      <div className="grid grid-cols-5 w-full overflow-hidden overflow-x-auto styled-scrollbar">
        {artists.map((item) => {
          return (
            <ArtistCard
              key={item.id}
              coverUrl={item.picture_big}
              id={item.id}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
}
