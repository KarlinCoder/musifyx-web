import { Suspense } from "react";
import ArtistLayoutContent from "./_components/artist-layout-content";
import ArtistLoading from "./loading";

export default async function ArtistLayout({
  params,
  children,
}: {
  params: Promise<{ artistId: string }>;
  children: React.ReactNode;
}) {
  const { artistId } = await params;

  return (
    <Suspense fallback={<ArtistLoading />}>
      <ArtistLayoutContent artistId={artistId}>
        {children}
      </ArtistLayoutContent>
    </Suspense>
  );
}
