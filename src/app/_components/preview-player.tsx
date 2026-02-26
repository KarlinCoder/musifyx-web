"use client";
import { genericBlur } from "@/lib/utils";
import { motion } from "motion/react";
import Image from "next/image";
import { RiCloseFill } from "react-icons/ri";

interface Props {
  coverUrl: string | null;
  onQuit: () => void;
  songTitle: string;
  artist: string;
}

export default function PreviewPlayer({
  coverUrl,
  onQuit,
  artist,
  songTitle,
}: Props) {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      className="fixed items-center z-10 top-4 right-6 flex bg-background-light rounded-md p-3 space-x-3 shadow-2xl shadow-black border border-white/6"
    >
      <Image
        src={coverUrl || "/not-loaded.jpg"}
        placeholder="blur"
        blurDataURL={genericBlur}
        alt="cover image"
        height={20}
        width={20}
        className="size-10 border border-white/3"
      />

      <div className="flex gap-3 items-center">
        <div>
          <p className="font-medium text-sm truncate">{songTitle}</p>
          <p className="text-text-muted text-[13px] hover:underline underline-offset-2 block truncate">
            {artist}
          </p>
        </div>
        <button
          onClick={onQuit}
          className="rounded-full bg-red-500/60 hover:bg-red-500/50 active:bg-red-500/60 p-1.5 hover:cursor-pointer flex justify-center items-center "
        >
          <div>
            <RiCloseFill color="#eee" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
