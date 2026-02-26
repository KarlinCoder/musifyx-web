import Hr from "./hr";

interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return (
    <div>
      <p className="text-5xl font-primary flex items-center gap-2 font-bold">
        {children}
      </p>

      <Hr className="mb-15 mt-5" />
    </div>
  );
}
