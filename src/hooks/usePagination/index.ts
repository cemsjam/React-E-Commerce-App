import { useState, useMemo } from "react";
import useFetch from "../useFetch";
import type { PaginationData, PaginationResult } from "./types";

function usePagination(baseUrl: string, query: string, itemPerPageLimit = 5): PaginationResult {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(itemPerPageLimit);
  const paginationQuery = `?limit=${limit}&skip=${(page - 1) * limit}`;
  const { data, loading, error } = useFetch<PaginationData>(baseUrl + paginationQuery);
  const numberOfPages = useMemo(() => Math.ceil(data?.total ?? 0 / limit), [limit, data?.total]);
  const buttons = useMemo(() => Array.from({ length: numberOfPages }, (_, i) => i + 1), [numberOfPages]);
  const changePage = (number: number) => {
    setPage(number);
  };
  return { data, loading, error, page, setPage, limit, buttons, changePage };
}

export default usePagination;
