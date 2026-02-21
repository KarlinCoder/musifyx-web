import { RiBarChartFill } from "react-icons/ri";
import PopularSongsSection from "./_components/popular-songs-section";
import { getCharts } from "@/services/deezer";
import axios from "axios";
import { DeezerCharts } from "@/types/deezer/types";

export default async function HomePage() {
  const { data } = await axios<DeezerCharts>(
    "https://cors-anywhere.com/https://api.deezer.com/chart",
    {
      headers: {
        origin: "https://musifyx.karlincoder.com",
      },
    }
  );

  console.log(data);

  return (
    <div className="size-full p-8">
      <h2 className="font-primary text-3xl font-medium flex items-center gap-3">
        <RiBarChartFill /> Lo mejor del momento
      </h2>

      <PopularSongsSection songs={data.tracks.data} />
    </div>
  );
}
