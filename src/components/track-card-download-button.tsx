import { downloadQueue } from "@/app/app/_lib/download-queue";
import { downloadTrack } from "@/services/download";
import { useState } from "react";

interface Props {
  trackId: number;
  title?: string;
  artist?: string;
  imageUrl?: string;
}

export default function TrackCardDownloadButton({
  trackId,
  title = "Canción",
  artist = "Artista",
  imageUrl = "/placeholder.png",
}: Props) {
  const [addedToQueueText, setAddedToQueueText] = useState(false);

  const handleClick = async () => {
    setAddedToQueueText(true);

    downloadQueue.add({ title, artist, imageUrl, type: "track" }, () =>
      downloadTrack(trackId),
    );

    setTimeout(() => {
      setAddedToQueueText(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={addedToQueueText}
      className="rounded-full disabled:bg-neutral-500 bg-[#333] hover:opacity-85 active:opacity-100 cursor-pointer text-white px-3 py-1.5 w-28 h-8 text-[13px] flex justify-center items-center transition-all duration-100 hover:shadow-lg"
    >
      {!addedToQueueText && "Descargar"}
      {addedToQueueText && "Agregado"}
    </button>
  );
}
