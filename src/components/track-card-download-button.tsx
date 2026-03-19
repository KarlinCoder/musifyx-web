import { downloadTrack } from "@/services/download";
import { useEffect, useRef, useState } from "react";
import { RiLoader2Fill } from "react-icons/ri";

interface Props {
  trackId: number;
}

export default function TrackCardDownloadButton({ trackId }: Props) {
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
      const data = await downloadTrack(trackId, controllerRef.current.signal);

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
      className="rounded-full bg-primary/90 hover:bg-primary active:scale-95 cursor-pointer text-white  px-3 py-1.5 w-28 h-8 text-sm flex justify-center items-center transition-all duration-200 hover:shadow-lg"
    >
      {!isLoading && "Descargar"}
      {isLoading && <RiLoader2Fill className="animate-spin" />}
    </button>
  );
}
