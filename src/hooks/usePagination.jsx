import { useState, useMemo } from "react";
import useFetch from "./useFetch";

function usePagination(baseUrl, query, itemPerPageLimit = 5) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(itemPerPageLimit);
  const paginationQuery = `?limit=${limit}&skip=${(page - 1) * limit}`;
  const { data, loading, error } = useFetch(baseUrl + paginationQuery);
  const numberOfPages = useMemo(() => Math.ceil(data.total / limit), [limit, data?.total]);
  const buttons = useMemo(() => Array.from({ length: numberOfPages }, (_, i) => i + 1), [numberOfPages]);
  const changePage = (number) => {
    setPage(number);
  };
  return { data, loading, error, page, setPage, limit, buttons, changePage };
}

export default usePagination;
