"use client";

import SearchBar from "@/components/search-bar";
import PageContainer from "@/components/page-container";
import PlaceholderPageGreeting from "@/components/placeholder-page-greeting";
import { useState } from "react";
import { RiUser2Line } from "react-icons/ri";

export default function ArtistsPage() {
  const [searchArtist, setSearchArtist] = useState("");
  const handleSearchArtist = (query: string) => setSearchArtist(query);

  return (
    <PageContainer>
      <SearchBar
        onSearchChange={handleSearchArtist}
        placeholder="Escribe el nombre de alguna banda o artista."
      />

      {searchArtist && (
        <PlaceholderPageGreeting
          icon={RiUser2Line}
          message="Comienza a buscar artistas o preguntale a la IA."
          title="Explora artistas."
        />
      )}
    </PageContainer>
  );
}
