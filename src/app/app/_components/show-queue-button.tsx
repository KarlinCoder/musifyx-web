"use client";

import { RiDownloadCloud2Fill } from "react-icons/ri";
import { useDialogsStore } from "../_stores/useDialogsStore";
import { useDownloadQueueStore } from "../_stores/useDownloadQueueStore";
import { motion } from "motion/react";

export default function ShowQueueButton() {
  const { setIsQueueSidebarOpen } = useDialogsStore();
  const { pending } = useDownloadQueueStore();

  return (
    <button
      className="fixed bottom-5 right-7 bg-primary hover:bg-secondary active:bg-primary p-3 rounded-full shadow-2xl shadow-black cursor-pointer"
      onClick={() => setIsQueueSidebarOpen(true)}
    >
      <RiDownloadCloud2Fill size={26} />

      {pending > 0 && (
        <motion.span
          key={pending}
          className="absolute -top-2 -right-2 text-white size-6 grid place-items-center text-xs rounded-full bg-red-500"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {pending}
        </motion.span>
      )}
    </button>
  );
}
