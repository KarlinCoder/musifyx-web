import { useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { Album, Artist, Playlist, Track } from "../_types/deezer";

interface Props {
  isFavorite: boolean;
  onFavoriteAdded: (id: string) => void;
  trackId: string;
  data: Track | Album | Artist | Playlist;
}

export default function FavoriteToggle({
  isFavorite,
  onFavoriteAdded,
  trackId,
  data,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const toggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const method = favorite ? "DELETE" : "POST";
      const url = `https://musify.api.karlincoder.com/user/favorite${favorite ? `/${trackId}` : ""}`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: !favorite ? JSON.stringify({ type: "track", data }) : undefined,
      });

      if (!res.ok) throw new Error("Error al actualizar favorito");

      setFavorite(!favorite);
      if (!favorite) onFavoriteAdded(trackId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      className="p-2 hover:scale-110 transition disabled:opacity-50"
      aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {favorite ? (
        <RiHeartFill className="w-6 h-6 text-red-500" />
      ) : (
        <RiHeartLine className="w-6 h-6 text-gray-400" />
      )}
    </button>
  );
}
