export type returns = {
  URL: string;
  page: number;
  maxPage: number;
  orderBy: string;
  orderDirection: "ASC" | "DESC";
  itemsPerPage: number;
  count: number;
  changePage: (direction: "next" | "previous") => void;
  changeItemsPerPage: (itemsPerPage: number) => void;
  changeOrderDirection: (direction?: "ASC" | "DESC") => void;
  changeOrderProperty: (orderProperty: string) => void;
  changeCount: (count: number) => void;
};
