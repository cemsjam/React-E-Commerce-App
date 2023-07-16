import { useState, useEffect } from "react";

function useFetch(baseUrl, query = "", usedInThisPlace) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(baseUrl + query, { signal });
        if (!res.ok) {
          throw new Error(`Response is not received for ${usedInThisPlace ?? "a component"}`);
        }
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setError(error.message);
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
