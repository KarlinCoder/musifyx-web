import Link from "next/link";

export default function AlbumNotFound() {
  return (
    <div className="size-full p-8 max-w-300 mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-6">
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
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.906m0 0H9.75m3 0h-3"
          />
        </svg>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-primary font-semibold text-neutral-200">
          Álbum no encontrado
        </h2>
        <p className="text-text-muted text-sm max-w-sm">
          No pudimos encontrar el álbum que buscas. Puede que haya sido
          eliminado o que el enlace no sea válido.
        </p>
      </div>

      <Link
        href="/app/albums"
        className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-neutral-200 rounded-full text-sm font-medium transition-colors"
      >
        Volver a Álbumes
      </Link>
    </div>
  );
}
