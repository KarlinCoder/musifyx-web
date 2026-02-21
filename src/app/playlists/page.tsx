"use client";

import SearchBar from "@/components/search-bar";
import PageContainer from "@/components/page-container";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import { useState } from "react";
import { RiPlayList2Line } from "react-icons/ri";

export default function PlaylistsPage() {
  const [searchPlaylist, setSearchPlaylist] = useState("");

  const handleSearchPlaylist = (query: string) => setSearchPlaylist(query);

  return (
    <PageContainer>
      <SearchBar
        onSearchChange={handleSearchPlaylist}
        placeholder="Escribe el nombre de alguna playlist."
      />

      {searchPlaylist && (
        <PlaceholderPageGreeting
          icon={RiPlayList2Line}
          message="Comienza a buscar playlists o preguntale a la IA."
          title="Explora playlists."
        />
      )}
    </PageContainer>
  );
}
