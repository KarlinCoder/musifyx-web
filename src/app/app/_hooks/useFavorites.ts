"use client";

import { useEffect, useCallback, useState } from "react";
import {
  addDatabaseFavorite,
  deleteDatabaseFavorite,
  getDatabaseFavorites,
} from "../services/favorites";
import { useFavoritesStore } from "../_stores/useFavoriteStore";
import { FavoriteItemInput } from "../_types/favorite";

interface Props {
  userToken: string;
}

export default function useFavorites({ userToken }: Props) {
  const {
    favorites,
    addFavorite: addLocalFavorite,
    removeFavorite: removeLocalFavorite,
  } = useFavoritesStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadFavorites = useCallback(async () => {
    if (!userToken) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log("📥 Cargando favoritos desde BD...");
      const dbFavorites = await getDatabaseFavorites(userToken);

      dbFavorites.forEach((item) => {
        addLocalFavorite(item);
      });

      console.log(
        `✔ ${dbFavorites.length} favoritos sincronizados en el store`,
      );
      return dbFavorites;
    } catch (err) {
      console.error("❌ Error cargando favoritos:", err);
      setError(
        err instanceof Error ? err : new Error("Error al cargar favoritos"),
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [userToken, addLocalFavorite]);

  const addFavorite = useCallback(
    async (item: FavoriteItemInput) => {
      // 1️⃣ Actualizar store local inmediatamente (UI reactiva)
      addLocalFavorite(item);

      // 2️⃣ Sincronizar con la base de datos
      try {
        await addDatabaseFavorite(userToken, item);
        console.log(`✔ Favorito ${item.id} guardado en BD`);
      } catch (err) {
        console.error("❌ Error guardando en BD, revirtiendo cambio local");
        // Revertir el cambio local si falla la API para mantener consistencia
        removeLocalFavorite(item.id);
        throw err;
      }
    },
    [userToken, addLocalFavorite, removeLocalFavorite],
  );

  const removeFavorite = useCallback(
    async (id: number) => {
      // 1️⃣ Eliminar del store local inmediatamente
      removeLocalFavorite(id);

      // 2️⃣ Sincronizar con la base de datos
      try {
        await deleteDatabaseFavorite(userToken, id);
        console.log(`✔ Favorito ${id} eliminado de BD`);
      } catch (err) {
        console.error("❌ Error eliminando de BD, revirtiendo cambio local");
        // ⚠️ Para revertir perfectamente necesitarías el objeto completo.
        // Opción simple: recargar favoritos desde BD para restaurar estado real
        await loadFavorites();
        throw err;
      }
    },
    [userToken, removeLocalFavorite, loadFavorites],
  );

  /**
   * 🔁 REFRESCAR: Fuerza recarga desde BD
   * Útil si necesitas sincronización manual o después de una operación crítica
   */
  const refreshFavorites = useCallback(async () => {
    // Limpiar store local antes de recargar para evitar duplicados
    useFavoritesStore.setState({ favorites: [] });
    return await loadFavorites();
  }, [loadFavorites]);

  /**
   * ✅ Helper: Verificar si un ID está en favoritos
   */
  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some((item) => item.id === id);
    },
    [favorites],
  );

  // 🔄 Cargar automáticamente al montar el hook (si hay token y store vacío)
  useEffect(() => {
    if (userToken && favorites.length === 0) {
      loadFavorites();
    }
  }, [userToken, favorites.length, loadFavorites]);

  return {
    // Estado
    favorites,
    isLoading,
    error,

    // Acciones
    addFavorite, // Agrega a store + BD
    removeFavorite, // Elimina de store + BD
    loadFavorites, // Carga desde BD → store
    refreshFavorites, // Fuerza recarga completa
    isFavorite, // Helper de consulta
  };
}
