import { create } from "zustand";
import { FavoriteItemInput } from "../_types/favorite";
import {
  addDatabaseFavorite,
  deleteDatabaseFavorite,
  getDatabaseFavorites,
} from "../services/favorites";

interface FavoritesState {
  favorites: FavoriteItemInput[];
  isLoading: boolean;
  addFavorite: (data: FavoriteItemInput, authToken: string) => Promise<void>;
  removeFavorite: (id: number, authToken: string) => Promise<void>;
  isFavorite: (id: number) => boolean;
  loadFavorites: (authToken: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,

  loadFavorites: async (authToken) => {
    set({ isLoading: true });
    const data = await getDatabaseFavorites(authToken);
    if (!data) return;
    set({ favorites: data, isLoading: false });
  },

  addFavorite: async (data, authToken) => {
    await addDatabaseFavorite(authToken, data);

    set((state) => ({
      favorites: [...state.favorites, data],
    }));
  },

  removeFavorite: async (id, token) => {
    await deleteDatabaseFavorite(token, id);
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== id),
    }));
  },

  isFavorite: (id) => get().favorites.some((item) => item.id === id),
}));
