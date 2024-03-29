import { useCallback, useEffect, useState } from "react";
import { props } from "../types/props";
import { returns } from "../types/returns";

const usePagination = ({ entityPlural }: props): returns => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>("id");
  const [orderDirection, setOrderDirection] = useState<"ASC" | "DESC">("ASC");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // Has to be calculated whenever count or items per page changes
  const [count, setCount] = useState(0);

  const [URL, setURL] = useState(
    `/api/${entityPlural}?page=${page}&perPage=${itemsPerPage}&by=${orderBy}&direction=${orderDirection}`,
  );

  const calculateMaxPage = useCallback(() => {
    const newMaxPage = Math.ceil(count / itemsPerPage);
    if (newMaxPage === 0) {
      setMaxPage(1);
    } else {
      setMaxPage(newMaxPage);
    }
  }, [count, itemsPerPage]);

  const changeURL = useCallback(() => {
    setURL(
      `/api/${entityPlural}?page=${page}&perPage=${itemsPerPage}&by=${orderBy}&direction=${orderDirection}`,
    );
  }, [entityPlural, page, itemsPerPage, orderBy, orderDirection]);

  // setting URL if one of state properties changes
  useEffect(() => {
    changeURL();
  }, [changeURL]);

  // setting max page using callback
  useEffect(() => {
    calculateMaxPage();
  }, [calculateMaxPage]);

  const changePage = (direction: "next" | "previous") => {
    setPage((prevPage) => {
      if (direction === "next") {
        if (prevPage < maxPage) {
          return prevPage + 1;
        }
      } else if (direction === "previous") {
        if (prevPage > 1) {
          return prevPage - 1;
        }
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
    URL,
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
