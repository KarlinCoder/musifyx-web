export default function ArtistLoading() {
  return (
    <div>
      <div className="flex justify-start p-8 pb-0">
        <div className="size-9 rounded-full bg-white/10 animate-pulse" />
      </div>

      <div className="mb-10">
        <div className="h-8 w-32 bg-white/10 animate-pulse rounded-md mb-4 ml-8" />

        <div className="grid grid-cols-5 gap-4 px-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full aspect-square bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-1/2 bg-white/10 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <div className="h-8 w-24 bg-white/10 animate-pulse rounded-md mb-4 ml-8" />

        <div className="grid grid-cols-5 gap-4 px-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full aspect-square bg-white/10 animate-pulse rounded-md" />
              <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-1/2 bg-white/10 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
