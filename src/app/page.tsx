import { RiBarChartFill } from "react-icons/ri";
import PopularSongsSection from "./_components/popular-songs-section";
import axios from "axios";
import { DeezerCharts } from "@/types/deezer/types";
import PopularAlbumsSection from "./_components/popular-albums-section";
import PopularArtistsSection from "./_components/popular-artists-section";
import PopularPlaylistsSection from "./_components/popular-playlists-section";

export default async function HomePage() {
  const { data: charts } = await axios<DeezerCharts>(
    "https://cors-anywhere.com/https://api.deezer.com/chart",
    {
      headers: {
        origin: "https://musifyx.karlincoder.com",
      },
    }
  );

  return (
    <div className="size-full p-8">
      <h2 className="font-primary text-3xl font-medium flex items-center gap-3">
        <RiBarChartFill /> Lo mejor del momento
      </h2>

      <PopularSongsSection songs={charts.tracks.data} />
      <PopularAlbumsSection albums={charts.albums.data} />
      <PopularArtistsSection artists={charts.artists.data} />
      <PopularPlaylistsSection playlists={charts.playlists.data} />
    </div>
  );
}
