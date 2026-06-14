interface Props {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: Props) {
  return (
    <div>
      <p className="text-3xl font-primary flex items-center gap-2 text-neutral-200 font-medium mb-4">
        {children}
      </p>
    </div>
  );
}
