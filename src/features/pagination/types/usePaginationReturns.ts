export type usePaginationReturns = usePaginationReturnsPrimitives &
  usePaginationReturnsFunctions;

export type usePaginationReturnsPrimitives = {
  page: number;
  maxPage: number;
  orderBy: string;
  orderDirection: "ASC" | "DESC";
  itemsPerPage: number;
  count: number;
};

export type usePaginationReturnsFunctions = {
  changePage: (direction: "next" | "previous") => void;
  changeItemsPerPage: (itemsPerPage: number) => void;
  changeOrderDirection: (direction?: "ASC" | "DESC") => void;
  changeOrderProperty: (orderProperty: string) => void;
  changeCount: (count: number) => void;
};
