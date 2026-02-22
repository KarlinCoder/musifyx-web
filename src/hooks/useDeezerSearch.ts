import { useEffect, useState } from "react";

interface UseDeezerSearchOptions {
  query: string | null;
  limit?: number;
}

export default function useDeezerSearch<T>(
  searchFn: (query: string, limit: number) => Promise<{ data: T[] }>,
  { query, limit = 50 }: UseDeezerSearchOptions,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setData([]);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data: results } = await searchFn(query, limit);
        console.log(results);
        setData(results);
      } catch (err) {
        console.error("Error in useDeezerSearch:", err);
        setError("No se pudieron cargar los resultados.");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, limit, searchFn]);

  return {
    isLoading,
    error,
    data,
  };
}
