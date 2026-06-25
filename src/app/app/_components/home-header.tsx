"use client";
import { UserButton } from "@clerk/react";
import Link from "next/link";
import { RiBarChartFill } from "react-icons/ri";

export default function HomeHeader() {
  const anchorLinks = [
    { url: "#canciones", label: "Canciones" },
    { url: "#albumes", label: "Álbumes" },
    { url: "#artistas", label: "Artistas" },
    { url: "#playlists", label: "Playlists" },
  ];

  return (
    <div className="flex justify-between">
      <div>
        <p className="text-4xl font-primary flex items-center gap-2 font-bold">
          <RiBarChartFill /> Descubre lo mejor del momento
        </p>

        <div className="flex gap-1 mt-2">
          {anchorLinks.map((link) => {
            return (
              <Link
                key={link.url}
                href={{ pathname: "/", hash: link.url }}
                scroll={false}
                className="text-xs bg-primary/50 rounded-sm px-4 py-2 uppercase"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="size-15 aspect-square border-2 border-white/20 rounded-full">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: { width: "100%", height: "100%" },
            },
          }}
        />
      </div>
    </div>
  );
}
