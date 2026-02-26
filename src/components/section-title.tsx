import Hr from "./hr";

interface Props {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: Props) {
  return (
    <div>
      <p className="text-3xl font-primary flex items-center gap-2 px-3 text-neutral-200 font-medium">
        {children}
      </p>

      <Hr className="mb-5 mt-4" />
    </div>
  );
}
