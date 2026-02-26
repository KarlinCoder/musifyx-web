import { RiBarChartFill } from "react-icons/ri";
import PopularSongsSection from "./_components/popular-songs-section";
import PopularAlbumsSection from "./_components/popular-albums-section";
import PopularArtistsSection from "./_components/popular-artists-section";
import PopularPlaylistsSection from "./_components/popular-playlists-section";
import Link from "next/link";
import { getPopular } from "@/services/deezer";

export default async function HomePage() {
  const anchorLinks = [
    { url: "#canciones", label: "Canciones" },
    { url: "#albumes", label: "Álbumes" },
    { url: "#artistas", label: "Artistas" },
    { url: "#playlists", label: "Playlists" },
  ];

  const charts = await getPopular();

  return (
    <div className="size-full p-8 scroll-smooth">
      <p className="text-5xl font-primary flex items-center gap-2 font-bold">
        <RiBarChartFill /> Descubre lo mejor del momento
      </p>

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

      <div className="flex flex-col gap-8 mt-5">
        <PopularSongsSection songs={charts.tracks.data} />
        <PopularAlbumsSection albums={charts.albums.data} />
        <PopularArtistsSection artists={charts.artists.data} />
        <PopularPlaylistsSection playlists={charts.playlists.data} />
      </div>
    </div>
  );
}
