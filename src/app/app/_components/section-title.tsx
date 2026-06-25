interface Props {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: Props) {
  return (
    <div>
      <p className="text-2xl px-1 font-primary flex items-center gap-2 text-neutral-300 font-medium mb-2">
        {children}
      </p>
    </div>
  );
}
