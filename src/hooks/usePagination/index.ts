import { useState, useMemo, useEffect } from "react";
import useFetch from "../useFetch";
import type { PaginationData, PaginationResult } from "./types";

function usePagination(baseUrl: string, query: string | undefined, itemPerPageLimit = 5): PaginationResult {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(itemPerPageLimit);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const paginationQuery = `?limit=${limit}&skip=${(page - 1) * limit}`;
  const { data, loading, error } = useFetch<PaginationData>(baseUrl + paginationQuery);
  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.total / limit));
    }
  }, [data, page]);
  const buttons = useMemo(() => Array.from({ length: numberOfPages }, (_, i) => i + 1), [numberOfPages]);

  const changePage = (number: number) => {
    setPage(number);
  };

  return { data, loading, error, page, setPage, limit, buttons, changePage };
}

export default usePagination;
