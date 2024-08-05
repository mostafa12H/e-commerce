import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error("could not fetch the data for that resource");
        }
        const data = await res.json();
        setData(data);
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, error };
};

export default useFetch;
