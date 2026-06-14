import { create } from "zustand";
import { FavoriteItemInput } from "../_types/favorite";

interface FavoritesState {
  favorites: FavoriteItemInput[];
  addFavorite: (data: FavoriteItemInput) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  addFavorite: (data: FavoriteItemInput) =>
    set((state) => ({
      favorites: [...state.favorites, data],
    })),

  removeFavorite: (id: number) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== id),
    })),

  isFavorite: (id: number) => get().favorites.some((item) => item.id === id),
}));
