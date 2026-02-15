"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const getPlaceholderText = () => {
    switch (pathname) {
      case "/songs": {
        return "Escribe el nombre de alguna canción.";
      }
      case "/albums": {
        return "Escribe el nombre de algún álbum o EP.";
      }
      case "/playlists": {
        return "Escribe el nombre de alguna playlist.";
      }
      case "/artists": {
        return "Escribe el nombre de alguna banda o artista.";
      }
    }
  };

  const handleSearchQuery = (query: string) => setSearchQuery(query);

  return (
    <motion.div className="absolute top-5 inset-x-0 w-full bg-background-light max-w-140 rounded-full overflow-hidden mx-auto border border-white/6">
      <input
        type="text"
        onChange={(e) => handleSearchQuery(e.target.value)}
        className="px-6 pl-14 py-3.5 size-full text-text text-sm"
        placeholder={getPlaceholderText()}
      />

      <RiSearchLine size={20} className="absolute top-3.25 left-5" />
    </motion.div>
  );
}
