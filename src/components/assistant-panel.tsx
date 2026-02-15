"use client";

import Image from "next/image";
import botProfilePicture from "@/assets/bot-profile-picture.webp";
import { motion } from "motion/react";
import { RiCloseFill } from "react-icons/ri";

interface Props {
  onClose: () => void;
}

export default function AssistantPanel({ onClose }: Props) {
  return (
    <motion.div
      initial={{ translateX: 30, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 30, opacity: 0 }}
      className="absolute bottom-6 right-6 bg-background w-full h-full max-w-110 max-h-150 border border-white/6 rounded-md overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-background-light">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={botProfilePicture}
              height={30}
              width={30}
              alt="Bot profile picture"
              className="size-10 rounded-full object-cover object-center"
            />

            <div className="absolute top-0 left-0 rounded-full size-3 bg-green-500 animate-pulse"></div>
          </div>
          <div className="-space-y-1">
            <h2 className="text-lg font-primary font-semibold">Musibot</h2>
            <p className="text-text-muted text-xs">En linea</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-red-300/10 active:bg-transparent cursor-pointer rounded-full"
        >
          <div>
            <RiCloseFill size={23} color="#e48" />
          </div>
        </button>
      </div>
    </motion.div>
  );
}
