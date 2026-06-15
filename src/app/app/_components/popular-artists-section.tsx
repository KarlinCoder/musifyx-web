import ArtistCard from "@/components/artist-card";
import SectionTitle from "@/components/section-title";
import { MFArtist } from "../_types/musify";

interface Props {
  artists: MFArtist[];
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
              info={{
                id: item.id,
                name: item.name,
                coverUrl: item.image_url,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
