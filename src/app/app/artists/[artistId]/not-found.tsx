import Link from "next/link";

export default function ArtistNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      <div className="size-24 rounded-full bg-white/5 flex items-center justify-center">
        <svg
          className="size-12 text-neutral-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-primary font-semibold text-neutral-200">
          Artista no encontrado
        </h2>
        <p className="text-text-muted text-sm max-w-sm">
          No pudimos encontrar el artista que buscas. Puede que haya sido
          eliminado o que el enlace no sea válido.
        </p>
      </div>

      <Link
        href="/app/artists"
        className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-neutral-200 rounded-full text-sm font-medium transition-colors"
      >
        Volver a Artistas
      </Link>
    </div>
  );
}
