interface Props {
  query: string;
}

export default function NoResults({ query }: Props) {
  return (
    <div className="flex flex-col justify-center items-center h-full text-neutral-500">
      <p>No se encontraron resultados para {`"${query}"`}.</p>
    </div>
  );
}
