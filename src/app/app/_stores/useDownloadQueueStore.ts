// _stores/useDownloadQueueStore.ts
import { create } from "zustand";

interface State {
  pending: number;
  total: number;
  setPending: (value: number) => void;
  setTotal: (value: number) => void;
  clear: () => void;
  incrementPending: () => void;
  decrementPending: () => void;
  incrementTotal: () => void;
}

export const useDownloadQueueStore = create<State>((set) => ({
  pending: 0,
  total: 0,

  setPending: (value) => set({ pending: value }),
  setTotal: (value) => set({ total: value }),
  clear: () => set({ pending: 0, total: 0 }),

  incrementPending: () => set((s) => ({ pending: s.pending + 1 })),
  decrementPending: () => set((s) => ({ pending: Math.max(0, s.pending - 1) })),
  incrementTotal: () => set((s) => ({ total: s.total + 1 })),
}));
