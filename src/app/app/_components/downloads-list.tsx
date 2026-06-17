"use client";

import { useEffect, useState } from "react";
import { DownloadItem, downloadQueue } from "../_lib/download-queue";
import { motion } from "motion/react";
import { useDialogsStore } from "../_stores/useDialogsStore";
import { useDownloadQueueStore } from "../_stores/useDownloadQueueStore";
import {
  RiCloseLargeLine,
  RiDownloadCloud2Line,
  RiCloseLine,
  RiDeleteBin6Fill,
} from "react-icons/ri";
import ImageWithFallback from "@/components/image-with-fallback";

export default function DownloadQueueList() {
  const { setIsQueueSidebarOpen } = useDialogsStore();
  const [items, setItems] = useState<DownloadItem[]>([]);
  const { pending } = useDownloadQueueStore();

  useEffect(() => {
    const interval = setInterval(() => setItems(downloadQueue.getAll()), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ backgroundColor: "#0000" }}
      animate={{ backgroundColor: "#0005" }}
      exit={{ backgroundColor: "#0000" }}
      transition={{ duration: 0.2 }}
      onClick={() => setIsQueueSidebarOpen(false)}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-90 w-full h-full bg-background shadow-2xl shadow-black border border-white/6 flex flex-col"
      >
        <header className="flex justify-between items-center p-4 border-b border-white/6 shrink-0">
          <div>
            <p className="flex items-center gap-2 font-primary font-medium text-2xl">
              Descargas{" "}
              <span className="text-base bg-primary/30 px-2 rounded-md font-mono">
                {pending}/{items.length}
              </span>
            </p>
            <p className="text-xs text-text-muted">
              En cola para no sobrecargar el servidor
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => downloadQueue.clearCompleted()}
              className="p-2 rounded-lg text-text-muted hover:bg-white/10 hover:text-red-400 active:bg-white/6 cursor-pointer"
            >
              <RiDeleteBin6Fill size={18} />
            </button>
            <button
              onClick={() => setIsQueueSidebarOpen(false)}
              className="text-red-400 cursor-pointer p-2 rounded-full hover:bg-white/6 active:bg-white/4"
            >
              <RiCloseLargeLine />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto styled-scrollbar p-2 space-y-2">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <RiDownloadCloud2Line
                size={48}
                className="text-text-muted opacity-40"
              />
              <p className="text-text-muted text-sm">
                No hay descargas activas
              </p>
            </div>
          )}

          {items.map((item) => {
            const isCancelled = item.status === "cancelled";
            const isCancellable =
              item.status === "pending" || item.status === "processing";

            const statusConfig: Record<
              DownloadItem["status"],
              { label: string; color: string; bg: string }
            > = {
              pending: {
                label: "En cola",
                color: "text-yellow-400",
                bg: "bg-yellow-400/10",
              },
              processing: {
                label: "Procesando...",
                color: "text-blue-400",
                bg: "bg-blue-400/10",
              },
              completed: {
                label: "Completado",
                color: "text-green-400",
                bg: "bg-green-400/10",
              },
              cancelled: { label: "", color: "", bg: "" },
              error: {
                label: "Error",
                color: "text-orange-400",
                bg: "bg-orange-400/10",
              },
            };

            const status = statusConfig[item.status];

            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-2.5 transition-all duration-100 ${
                  isCancelled
                    ? "opacity-40 cursor-not-allowed pointer-events-none hover:bg-transparent"
                    : "hover:bg-white/5"
                }`}
              >
                <div
                  className={`size-14 shrink-0 rounded overflow-hidden transition-all duration-300 ${isCancelled ? "grayscale" : ""}`}
                >
                  <ImageWithFallback
                    src={item.imageUrl}
                    fallbackType="track"
                    alt={item.title}
                    width={56}
                    height={56}
                    className="size-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className={`font-medium text-sm truncate transition-colors ${isCancelled ? "text-text-muted/60 line-through" : ""}`}
                  >
                    {item.title}
                  </p>
                  <p className="text-xs text-text-muted truncate">
                    {item.artist} •{" "}
                    {item.type === "album" ? "Álbum" : "Canción"}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5">
                    {item.status === "processing" && (
                      <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    )}

                    {!isCancelled && (
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-md ${status.bg} ${status.color} capitalize`}
                      >
                        {status.label}
                      </span>
                    )}
                  </div>
                </div>

                {!isCancelled && isCancellable && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadQueue.cancel(item.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-text-muted/70 hover:text-red-400 transition-all opacity-60 group-hover:opacity-100"
                    title="Cancelar descarga"
                  >
                    <RiCloseLine size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
