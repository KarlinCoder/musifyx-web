"use client";

import { useRouter } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-0.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
    >
      <RiArrowLeftSLine size={16} />
      Volver
    </button>
  );
}
