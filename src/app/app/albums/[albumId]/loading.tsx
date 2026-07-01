export default function AlbumLoading() {
  return (
    <div className="size-full p-8 max-w-300 mx-auto">
      <div className="mx-auto w-full">
        <header className="flex items-center gap-5 w-full pb-10 relative">
          <div className="absolute top-0 left-0">
            <div className="size-9 rounded-full bg-white/10 animate-pulse" />
          </div>

          <div className="max-w-65 w-full shadow-2xl shadow-background">
            <div className="w-full aspect-square bg-white/10 animate-pulse rounded-md" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="h-12 w-3/4 bg-white/10 animate-pulse rounded-md" />

            <div className="flex items-center gap-2 mt-4">
              <div className="size-7 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-32 bg-white/10 animate-pulse rounded-md" />
            </div>

            <div className="flex items-center gap-2 mt-1">
              <div className="h-4 w-20 bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-24 bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-36 bg-white/10 animate-pulse rounded-md" />
            </div>

            <div className="flex gap-2 mt-3">
              <div className="h-9 w-9 bg-white/10 animate-pulse rounded-full" />
              <div className="h-9 w-9 bg-white/10 animate-pulse rounded-full" />
            </div>
          </div>
        </header>

        <main className="pb-10">
          <div className="h-0.5 w-full bg-white/10 rounded-full" />

          <div className="flex flex-col gap-1 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 rounded-md"
              >
                <div className="h-4 w-6 bg-white/10 animate-pulse rounded" />
                <div className="size-10 bg-white/10 animate-pulse rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-white/10 animate-pulse rounded" />
                  <div className="h-3 w-1/5 bg-white/10 animate-pulse rounded" />
                </div>
                <div className="h-4 w-10 bg-white/10 animate-pulse rounded" />
              </div>
            ))}
          </div>

          <div className="h-px w-full bg-white/10 my-4" />

          <div className="space-y-2">
            <div className="h-3 w-1/4 bg-white/10 animate-pulse rounded" />
            <div className="h-3 w-1/3 bg-white/10 animate-pulse rounded" />
          </div>
        </main>
      </div>
    </div>
  );
}
