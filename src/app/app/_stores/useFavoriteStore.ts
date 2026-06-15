import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoriteItemInput } from "../_types/favorite";

interface FavoritesState {
  favorites: FavoriteItemInput[];
  addFavorite: (data: FavoriteItemInput) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (data) => {
        set((state) => {
          if (state.favorites.some((item) => item.id === data.id)) return state;
          return { favorites: [...state.favorites, data] };
        });
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((item) => item.id !== id),
        }));
      },

      isFavorite: (id) => get().favorites.some((item) => item.id === id),
    }),
    {
      name: "musify-favorites",
    },
  ),
);
