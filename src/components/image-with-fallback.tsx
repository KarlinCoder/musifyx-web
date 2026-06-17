"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

type FallbackType = "album" | "artist" | "playlist" | "track";

const FALLBACKS: Record<FallbackType, string> = {
  album: "/images/placeholder/album.jpg",
  artist: "/images/placeholder/artist.jpg",
  playlist: "/images/placeholder/playlist.jpg",
  track: "/images/placeholder/track.jpg",
};

interface Props extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | null | undefined;
  fallbackType?: FallbackType;
}

export default function ImageWithFallback({
  src,
  fallbackType = "track",
  alt,
  ...rest
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
    src || FALLBACKS[fallbackType],
  );
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(FALLBACKS[fallbackType]);
    }
  };

  return (
    <Image
      {...rest}
      src={imgSrc || FALLBACKS[fallbackType]}
      alt={alt}
      onError={handleError}
    />
  );
}
