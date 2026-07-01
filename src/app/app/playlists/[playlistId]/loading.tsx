export default function PlaylistLoading() {
  return (
    <div className="size-full">
      <div className="max-w-300 mx-auto w-full p-10 space-y-20">
        <header className="flex items-center gap-5 w-full relative">
          <div className="absolute top-0 left-0">
            <div className="size-9 rounded-full bg-white/10 animate-pulse" />
          </div>

          <div className="max-w-65 w-full shadow-2xl shadow-background">
            <div className="w-full aspect-square bg-white/10 animate-pulse rounded-md" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="h-11 w-2/3 bg-white/10 animate-pulse rounded-md" />

            <div className="flex items-center gap-1 mt-2">
              <div className="size-5 bg-white/10 animate-pulse rounded" />
              <div className="h-4 w-32 bg-white/10 animate-pulse rounded-md" />
            </div>

            <div className="mt-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-20 bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-4 bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-16 bg-white/10 animate-pulse rounded-md" />
              </div>
              <div className="h-4 w-40 bg-white/10 animate-pulse rounded-md" />
              <div className="h-px w-full bg-white/10" />
              <div className="h-4 w-full bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-2/3 bg-white/10 animate-pulse rounded-md" />
            </div>

            <div className="flex gap-2 mt-3">
              <div className="h-9 w-9 bg-white/10 animate-pulse rounded-full" />
              <div className="h-9 w-9 bg-white/10 animate-pulse rounded-full" />
            </div>
          </div>
        </header>

        <main>
          <div className="h-7 w-28 bg-white/10 animate-pulse rounded-md mb-4" />

          <div className="flex flex-col gap-1 relative pb-8">
            {Array.from({ length: 10 }).map((_, i) => (
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
        </main>
      </div>
    </div>
  );
}
