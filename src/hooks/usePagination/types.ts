import type { Products } from "@/types/Product";

export type PaginationData = {
  total: number;
  products: Products;
};
export type PaginationResult = {
  data: PaginationData | null;
  loading: boolean;
  error: Error | null;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  buttons: number[];
  changePage: (page: number) => void;
};
