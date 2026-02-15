export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="size-full text-neutral-600 flex flex-col justify-center items-center gap-0">
      {children}
    </div>
  );
}
