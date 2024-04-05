import { useCallback, useEffect, useState } from "react";
import { usePaginationReturns } from "../types/usePaginationReturns";

const usePagination = (): usePaginationReturns => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("createdAt");
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("DESC");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // Has to be calculated whenever count or items per page changes
  const [count, setCount] = useState(0);

  const calculateMaxPage = useCallback(() => {
    const newMaxPage = Math.ceil(count / itemsPerPage);
    if (newMaxPage === 0) {
      setMaxPage(1);
    } else {
      setMaxPage(newMaxPage);
    }
    setPage(1);
  }, [count, itemsPerPage]);

  // setting max page using callback
  useEffect(() => {
    calculateMaxPage();
  }, [calculateMaxPage]);

  const changePage = (
    direction:
      | "next"
      | "previous"
      | "double next"
      | "double previous"
      | "first"
      | "last",
  ) => {
    setPage((prevPage) => {
      if (direction.includes("next")) {
        if (direction.includes("double")) {
          if (prevPage + 1 < maxPage) {
            return prevPage + 2;
          }
        } else if (prevPage < maxPage) {
          return prevPage + 1;
        }
      } else if (direction.includes("previous")) {
        if (direction.includes("double")) {
          if (prevPage - 1 > 1) {
            return prevPage - 2;
          }
        } else if (prevPage > 1) {
          return prevPage - 1;
        }
      } else if (direction === "first") {
        return 1;
      } else if (direction === "last") {
        return maxPage;
      }
      return prevPage;
    });
  };

  const changeOrderDirection = (direction?: "ASC" | "DESC") => {
    if (direction) {
      setOrderDirection(direction);
    } else {
      setOrderDirection((prevDirection) => {
        if (prevDirection === "ASC") return "DESC";
        return "ASC";
      });
    }
  };

  const changeOrderProperty = (orderProperty: string) => {
    setOrderBy(orderProperty);
  };

  const changeItemsPerPage = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const changeCount = (count: number) => {
    setCount(count);
  };

  return {
    page,
    maxPage,
    orderBy,
    orderDirection,
    itemsPerPage,
    count,
    changePage,
    changeItemsPerPage,
    changeOrderDirection,
    changeOrderProperty,
    changeCount,
  };
};

export default usePagination;
