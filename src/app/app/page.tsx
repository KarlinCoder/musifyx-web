import { RiBarChartFill } from "react-icons/ri";
import PopularSongsSection from "./_components/popular-songs-section";
import PopularAlbumsSection from "./_components/popular-albums-section";
import PopularArtistsSection from "./_components/popular-artists-section";
import PopularPlaylistsSection from "./_components/popular-playlists-section";
import Link from "next/link";
import { getPopularNow } from "./services/musify";
import type { MFTrack, MFAlbum, MFArtist, MFPlaylist } from "./_types/musify";

export default async function HomePage() {
  const anchorLinks = [
    { url: "app#canciones", label: "Canciones" },
    { url: "app#albumes", label: "Álbumes" },
    { url: "app#artistas", label: "Artistas" },
    { url: "#playlists", label: "Playlists" },
  ];

  let charts: {
    tracks: MFTrack[];
    albums: MFAlbum[];
    artists: MFArtist[];
    playlists: MFPlaylist[];
  } = { tracks: [], albums: [], artists: [], playlists: [] };

  try {
    charts = await getPopularNow();
  } catch (error) {
    console.error("Error fetching popular now:", error);
  }

  return (
    <div className="size-full p-8 max-w-300 mx-auto scroll-smooth">
      <p className="text-5xl font-primary flex items-center gap-2 font-bold">
        <RiBarChartFill /> Descubre lo mejor del momento
      </p>

      <div className="flex gap-1 mt-2">
        {anchorLinks.map((link) => {
          return (
            <Link
              key={link.url}
              href={{ pathname: "/", hash: link.url }}
              className="text-xs bg-primary/50 rounded-sm px-4 py-2 uppercase"
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex flex-col gap-8 mt-5 pb-10">
        <PopularSongsSection songs={charts.tracks} />
        <PopularAlbumsSection albums={charts.albums} />
        <PopularArtistsSection artists={charts.artists} />
        <PopularPlaylistsSection playlists={charts.playlists} />
      </div>
    </div>
  );
}
