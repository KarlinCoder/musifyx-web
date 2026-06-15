"use client";

import SectionTitle from "@/components/section-title";
import { useEffect } from "react";
import TrackCard from "@/components/track-card";
import { MusifyTrack } from "../../_types/musify";
import { useFavoritesStore } from "../../_stores/useFavoriteStore";

export default function FavoritesPageContent() {
  const { favorites } = useFavoritesStore();

  useEffect(() => {}, [favorites]);

  return (
    <>
      <div className="grid-results">
        <SectionTitle>Canciones favoritas</SectionTitle>
        <div className="relative grid grid-cols-2 p-grid pb-20">
          {favorites
            .filter((item) => item.type === "track")
            .map((track) => {
              const trackData = track.data as unknown as MusifyTrack;
              return (
                <TrackCard
                  key={track.id}
                  data={{
                    id: trackData.id,
                    artists: trackData.artists,
                    duration: trackData.duration,
                    explicit_lyrics: trackData.explicit_lyrics,
                    image_url: trackData.image_url,
                    title: trackData.title,
                  }}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
