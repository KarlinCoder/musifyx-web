// _lib/download-queue.ts
import pLimit from "p-limit";
import { useDownloadQueueStore } from "../_stores/useDownloadQueueStore";

export type DownloadItem = {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  type: "album" | "track";
  status: "pending" | "processing" | "completed" | "cancelled" | "error";
  downloadUrl?: string;
};

type QueueItem = DownloadItem & { resolve?: () => void };

const limit = pLimit(2);
const queue = new Map<string, QueueItem>();

const updateCounts = (pendingDelta: number, totalDelta: number = 0) => {
  const store = useDownloadQueueStore.getState();
  store.setPending(Math.max(0, store.pending + pendingDelta));
  if (totalDelta > 0) store.incrementTotal();
};

export const downloadQueue = {
  getPending: () => useDownloadQueueStore.getState().pending,
  getTotal: () => useDownloadQueueStore.getState().total,

  add: async (
    item: Omit<DownloadItem, "id" | "status">,
    fetchFn: () => Promise<{ success: boolean; download_url: string }>,
  ) => {
    const id = crypto.randomUUID();
    const entry: QueueItem = { ...item, id, status: "pending" };

    queue.set(id, entry);

    updateCounts(1);

    limit(async () => {
      const current = queue.get(id);
      if (!current || current.status === "cancelled") {
        // ✅ Si fue cancelado antes de empezar: -1 pending
        updateCounts(-1);
        return;
      }

      current.status = "processing";

      try {
        const res = await fetchFn();

        if (res.success && queue.get(id)?.status !== "cancelled") {
          // ✅ Completado: -1 pending, +1 total
          entry.downloadUrl = res.download_url;
          entry.status = "completed";
          updateCounts(-1, 1);
          window.location.href = res.download_url;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        if (queue.get(id)?.status !== "cancelled") {
          entry.status = "error";
          updateCounts(-1);
        }
      }
    });

    return id;
  },

  cancel: (id: string) => {
    const item = queue.get(id);
    if (item && (item.status === "pending" || item.status === "processing")) {
      item.status = "cancelled";
      updateCounts(-1);
    }
  },

  getAll: () => Array.from(queue.values()),

  get: (id: string) => queue.get(id),

  clearCompleted: () => {
    for (const [id, item] of queue.entries()) {
      if (
        item.status === "completed" ||
        item.status === "error" ||
        item.status === "cancelled"
      ) {
        queue.delete(id);
      }
    }
  },
};
