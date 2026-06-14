"use client";

import Hr from "@/components/hr";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  artistId: number;
}

export default function ArtistNavbar({ artistId }: Props) {
  const pathname = usePathname();

  const links = [
    { label: "Discografía", url: `/app/artists/${artistId}` },
    { label: "Popular", url: `/app/artists/${artistId}/popular` },
    { label: "Radio", url: `/app/artists/${artistId}/radio` },
    { label: "Playlists", url: `/app/artists/${artistId}/playlists` },
    { label: "Menciones", url: `/app/artists/${artistId}/mentions` },
    { label: "Similares", url: `/app/artists/${artistId}/similar` },
  ];

  return (
    <section>
      <nav className="flex">
        {links.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            className={`border-b-2 ${link.url === pathname ? "border-primary" : "border-transparent"} inline-block px-4 py-3 text-sm hover:bg-background active:bg-transparent focus:border-b-2 font-medium text-neutral-400`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Hr />
    </section>
  );
}
