"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { RiFileTextLine, RiLightbulbLine } from "react-icons/ri";

interface Props {
  onSelect: (option: string) => void;
  onClose: () => void;
  isFavorite: boolean;
}

export default function TrackCardDropdown({ onSelect, onClose }: Props) {
  const options = [
    {
      label: "Ver letras",
      value: "track-lyrics",
      icon: RiFileTextLine,
    },
    {
      label: "Análisis",
      value: "track-meaning",
      icon: RiLightbulbLine,
    },
  ];

  const { getToken } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleFavorite = async () => {
    const token = await getToken();

    if (!token) return;

    // const data = await addFavorite(token, {
    //   artists: flatTrackContributorsNames(track),
    //   cover_url: track.album.cover_medium,
    //   musify_id: track.id,
    //   duration: track.duration,
    //   id: track.id,
    //   title: track.title,
    // });

    // console.log(data);
  };

  const handleOptionClick = (option: (typeof options)[0]) => {
    if (option.value === "track-favorite") {
      handleToggleFavorite();
    } else {
      onSelect(option.value);
    }
    onClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={dropdownRef}
      onMouseLeave={() => setTimeout(onClose, 200)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute z-200 -top-15 right-0 w-40 overflow-hidden rounded-lg border border-white/6 bg-background backdrop-blur-xl shadow-2xl shadow-black"
    >
      <ul>
        {options.map((option) => {
          const Icon = option.icon;

          return (
            <li key={option.label}>
              <button
                onClick={() => handleOptionClick(option)}
                className={`group w-full flex items-center gap-2 px-4 py-4 transition-all duration-50 cursor-pointer active:opacity-80 hover:bg-white/4 active:bg-transparent`}
              >
                <Icon size={20} />
                <p className="text-sm text-neutral-400">{option.label}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
