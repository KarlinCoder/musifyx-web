import { create } from "zustand";

type DialogState = {
  isQueueSidebarOpen: boolean;
  setIsQueueSidebarOpen: (isOpen: boolean) => void;
};

export const useDialogsStore = create<DialogState>((set) => ({
  isQueueSidebarOpen: false,
  setIsQueueSidebarOpen: (isOpen: boolean) =>
    set({ isQueueSidebarOpen: isOpen }),
}));
