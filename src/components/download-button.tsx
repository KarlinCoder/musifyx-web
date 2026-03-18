"use client";

import { downloadAlbum } from "@/services/download";
import { useEffect, useMemo, useRef, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";

interface Props {
  children: React.ReactNode;
  id: number;
}

export default function DownloadButton({ children, id }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const handleClick = async () => {
    const newController = new AbortController();
    controllerRef.current = newController;

    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await downloadAlbum(id, controllerRef.current.signal);

      if (data.download_url) {
        window.open(data.download_url, "_blank");
      } else {
        throw new Error("URL de descarga no disponible");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="min-w-50 flex items-center justify-center gap-2 mt-3 text-sm bg-primary hover:bg-primary/85 active:bg-primary disabled:opacity-90 transition-all duration-100 text-white rounded-full cursor-pointer py-2 font-semibold"
    >
      {isLoading ? (
        <>
          <RiLoader2Fill size={20} className="animate-spin" /> Procesando
        </>
      ) : (
        <p>{children}</p>
      )}

      {error && <p>{error}</p>}
    </button>
  );
}
