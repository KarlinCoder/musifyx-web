interface Props {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: Props) {
  return (
    <div className="bg-background-light rounded-xl p-5 mb-6">
      <p className="text-lg font-primary text-neutral-300 font-medium mb-1">
        {title}
      </p>
      {children}
    </div>
  );
}
