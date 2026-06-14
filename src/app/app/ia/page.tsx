"use client";

import { useState, FormEvent } from "react";
import IAInput from "./_components/ia-input";
import IAResponse from "./_components/ia-response";

interface TrackResult {
  id: number;
  title: string;
  artists: { id: number; name: string; image_url: string }[];
  image_url: string;
  explicit_lyrics: boolean;
  duration: number;
}

interface AlbumResult {
  id: number;
  coverUrl: string;
  title: string;
  artistName: string;
  hasExplicitLyrics: boolean;
  recordType: string;
}

interface ArtistResult {
  id: number;
  name: string;
  coverUrl: string;
}

interface PlaylistResult {
  id: number;
  picture: string;
  title: string;
  isOfficial: boolean;
  nb_tracks: number;
}

interface ResponseData {
  response: string;
  results: {
    tracks?: TrackResult[];
    albums?: AlbumResult[];
    artists?: ArtistResult[];
    playlists?: PlaylistResult[];
  };
}

const mockData: Record<string, ResponseData> = {
  default: {
    response:
      "He seleccionado estas recomendaciones especialmente para ti basadas en tu solicitud. He buscado en nuestra base de datos las mejores opciones que coinciden con lo que pediste. Aquí encontrarás una variedad de contenido musical que abarca diferentes estilos y artistas populares. Puedes explorar cada sección para descubrir nueva música que quizás no conocías. Si necesitas más recomendaciones o quieres refinar la búsqueda, no dudes en preguntar de nuevo.",
    results: {
      tracks: [
        {
          id: 1,
          title: "Billonario",
          artists: [{ id: 1, name: "Peso Pluma", image_url: "" }],
          image_url: "https://via.placeholder.com/300",
          explicit_lyrics: false,
          duration: 180,
        },
        {
          id: 2,
          title: "La Bebe",
          artists: [{ id: 2, name: "Peso Pluma", image_url: "" }],
          image_url: "https://via.placeholder.com/300",
          explicit_lyrics: false,
          duration: 195,
        },
      ],
      albums: [
        {
          id: 1,
          coverUrl: "https://via.placeholder.com/300",
          title: "Genesis",
          artistName: "Peso Pluma",
          hasExplicitLyrics: false,
          recordType: "Álbum",
        },
      ],
      artists: [
        {
          id: 1,
          name: "Peso Pluma",
          coverUrl: "https://via.placeholder.com/300",
        },
      ],
      playlists: [
        {
          id: 1,
          picture: "https://via.placeholder.com/300",
          title: "Top 50 - México",
          isOfficial: true,
          nb_tracks: 50,
        },
      ],
    },
  },
};

export default function IAPage() {
  const [input, setInput] = useState("");
  const [hasSent, setHasSent] = useState(false);
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);

    setTimeout(() => {
      setResponse(mockData.default);
      setHasSent(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setHasSent(false);
    setResponse(null);
    setInput("");
  };

  if (hasSent && response) {
    return <IAResponse response={response} onReset={handleReset} />;
  }

  return (
    <>
      <IAInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
