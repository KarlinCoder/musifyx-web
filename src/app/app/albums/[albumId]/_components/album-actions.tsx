"use client";

import { useState } from "react";
import EntityActions from "@/app/app/_components/entity-actions";
import { downloadQueue } from "@/app/app/_lib/download-queue";
import { downloadAlbumSSE } from "@/app/app/_services/musify";
import type { MFAlbumPage } from "@/app/app/_types/musify";

interface Props {
  album: MFAlbumPage;
}

export default function AlbumActions({ album }: Props) {
  const [addedToQueueText, setAddedToQueueText] = useState(false);

  const handleDownloadClick = async () => {
    setAddedToQueueText(true);

    downloadQueue.add(
      {
        title: album.title,
        artist: album.artist.name,
        imageUrl: album.image_url,
        type: "album",
      },
      (queueId) =>
        downloadAlbumSSE(album.id, {
          onProgress: (progress, message) => {
            downloadQueue.updateProgress(queueId, progress, message);
          },
          onDone: () => {},
          onError: () => {},
        }),
    );

    setTimeout(() => {
      setAddedToQueueText(false);
    }, 2000);
  };

  return (
    <EntityActions
      type="album"
      entity={album}
      showDownload
      onDownload={handleDownloadClick}
      isDownloading={addedToQueueText}
    />
  );
}
