interface Props {
  error: string;
}

export default function SearchError({ error }: Props) {
  return (
    <div className="flex justify-center items-center h-full text-red-400">
      {error}
    </div>
  );
}
