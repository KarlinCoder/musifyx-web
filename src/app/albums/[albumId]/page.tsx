export default async function AlbumIdPage({
  params,
}: {
  params: Promise<{ albumId: number }>;
}) {
  const { albumId } = await params;

  return (
    <div>
      <h2 className="text-3xl font-primary text-text font-semibold">
        Albums id: {albumId}
      </h2>
    </div>
  );
}
