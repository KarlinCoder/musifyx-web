"use client";

import logoImg from "@/assets/logo.webp";

import {
  RiAlbumLine,
  RiAlbumFill,
  RiFireLine,
  RiHome2Line,
  RiHome2Fill,
  RiMusic2Line,
  RiMusic2Fill,
  RiPlayList2Line,
  RiUser2Line,
  RiUser2Fill,
  RiPlayList2Fill,
  RiFireFill,
  RiBardFill,
  RiBardLine,
} from "react-icons/ri";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();

  const menuLinks = [
    { icon: RiHome2Line, accentIcon: RiHome2Fill, label: "Inicio", url: "/" },
    {
      icon: RiMusic2Line,
      accentIcon: RiMusic2Fill,
      label: "Canciones",
      url: "/songs",
    },
    {
      icon: RiAlbumLine,
      accentIcon: RiAlbumFill,
      label: "Álbumes",
      url: "/albums",
    },
    {
      icon: RiUser2Line,
      accentIcon: RiUser2Fill,
      label: "Artistas",
      url: "/artists",
    },
    {
      icon: RiPlayList2Line,
      accentIcon: RiPlayList2Fill,
      label: "Playlists",
      url: "/playlists",
    },
    {
      icon: RiFireLine,
      accentIcon: RiFireFill,
      label: "Charts",
      url: "/charts",
    },
    {
      icon: RiBardLine,
      accentIcon: RiBardFill,
      label: "IA",
      url: "/ia",
    },
  ];

  return (
    <aside className="flex flex-col gap-8 max-w-75 w-full bg-background p-3 border-r border-white/6">
      <div className="p-3">
        <Image
          src={logoImg}
          alt="Logo"
          height={80}
          width={80}
          className="rounded-lg"
        />
        <p className="relative font-primary text-3xl font-semibold mt-2 inline-block">
          Musify
          <span className="absolute text-base -right-3">X</span>
        </p>
        <p className="text-text-muted text-sm">
          Tu biblioteca musical personal.
        </p>
      </div>

      <nav>
        <ul>
          {menuLinks.map((item) => {
            const Icon = item.icon;
            const AccentIcon = item.accentIcon;

            return (
              <li key={item.label}>
                <Link
                  href={item.url}
                  className={`relative flex items-center gap-2 font-light text-sm px-6 py-3.5 rounded-lg hover:bg-white/3 ${
                    pathname === item.url && "bg-white/3"
                  }`}
                >
                  {pathname === item.url && (
                    <div className="absolute bg-primary rounded-full w-1 h-5 top-50% left-0.5"></div>
                  )}

                  <div>
                    {pathname === item.url ? (
                      <AccentIcon size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>

                  <p>{item.label}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto px-3">
        <p className="text-xs text-text-muted">Creado y mantenido por</p>
        <a
          target="_blank"
          href="https://karlincoder.com"
          className="inline-block text-lg font-primary hover:underline"
        >
          KarlinCoder
        </a>
      </div>
    </aside>
  );
}
