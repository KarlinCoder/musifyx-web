import { RiBarChartFill } from "react-icons/ri";
import PopularSongsSection from "./_components/popular-songs-section";
import axios from "axios";
import PopularAlbumsSection from "./_components/popular-albums-section";
import PopularArtistsSection from "./_components/popular-artists-section";
import PopularPlaylistsSection from "./_components/popular-playlists-section";
import Link from "next/link";
import { DeezerChart } from "@/types/deezer";

export default async function HomePage() {
  const anchorLinks = [
    { url: "#canciones", label: "Canciones" },
    { url: "#albumes", label: "Álbumes" },
    { url: "#artistas", label: "Artistas" },
    { url: "#playlists", label: "Playlists" },
  ];

  const { data: charts } = await axios<DeezerChart>(
    "https://cors-anywhere.com/https://api.deezer.com/chart",
    {
      headers: {
        origin: "https://musifyx.karlincoder.com",
      },
    },
  );

  return (
    <div className="size-full p-8 scroll-smooth">
      <h2 className="font-primary text-3xl font-medium flex items-center gap-3">
        <RiBarChartFill /> Lo mejor del momento
      </h2>

      <div className="flex gap-2 mt-3">
        {anchorLinks.map((link) => {
          return (
            <Link
              key={link.url}
              href={{ pathname: "/", hash: link.url }}
              className="text-xs bg-primary/50 rounded-lg px-4 py-2.5 "
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <PopularSongsSection songs={charts.tracks.data} />
      <PopularAlbumsSection albums={charts.albums.data} />
      <PopularArtistsSection artists={charts.artists.data} />
      <PopularPlaylistsSection playlists={charts.playlists.data} />
    </div>
  );
}
