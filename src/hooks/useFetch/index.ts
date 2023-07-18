import { useState, useEffect } from "react";
import type { FetchResult } from "./types";

function useFetch<T>(baseUrl: string, query = ""): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(baseUrl + query, { signal });
        if (!res.ok) {
          throw new Error(`Something went wrong please try again!`);
        }
        const json: T = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [baseUrl, query]);

  return { data, loading, error };
}

export default useFetch;
