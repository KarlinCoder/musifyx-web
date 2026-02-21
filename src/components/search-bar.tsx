"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

interface Props {
  placeholder: string;
}

export default function SearchBar({ placeholder }: Props) {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || ""
  );
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }

      const newQueryString = params.toString();

      if (newQueryString !== searchParams.toString()) {
        router.replace(`${pathname}?${newQueryString}`);
      }
    }, 300);

    return () => clearTimeout(handler); // 👈 timeout, no interval
  }, [inputValue, pathname, router, searchParams]);

  // ✅ Solo mostramos la barra en las rutas RAÍZ exactas
  const allowedPaths = [
    "/songs",
    "/albums",
    "/playlists",
    "/genres",
    "/artists",
  ];
  const isHidden = !allowedPaths.includes(pathname);

  const getPlaceholderText = () => {
    switch (pathname) {
      case "/songs":
        return "";
      case "/albums":
        return "";
      case "/playlists":
        return "Escribe el nombre de alguna playlist.";
      case "/artists":
        return "Escribe el nombre de alguna banda o artista.";
      case "/genres":
        return "Escribe el nombre de algún género musical.";
      default:
        return "Buscar...";
    }
  };

  return (
    <div className="w-full bg-background py-3 px-5 border-b border-b-white/6">
      <div className="relative w-full bg-background-light max-w-140 rounded-full overflow-hidden border border-white/6 z-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-6 pl-14 py-3.5 size-full text-text text-sm"
          placeholder={placeholder}
        />
        <RiSearchLine size={20} className="absolute top-3.25 left-5" />
      </div>
    </div>
  );
}
