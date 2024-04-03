import { useCallback, useEffect, useState } from "react";
import { ICategory } from "../../../api/types/ICategory";
import { IMark } from "../../../api/types/IMark";

type useURLProps = {
  entityPlural: string;

  page: number;
  itemsPerPage: number;
  orderBy: string;
  orderDirection: string;

  searchWord: string;

  selectedCategories: ICategory[];
  selectedMarks: IMark[];

  maxPrice: number;
  minPrice: number;
};

const generateURL = (p: useURLProps) => {
  let defaultURL =
    `/api/${p.entityPlural}` +
    `?page=${p.page}` +
    `&perPage=${p.itemsPerPage}` +
    `&by=${p.orderBy}` +
    `&direction=${p.orderDirection}` +
    `&maxPrice=${p.maxPrice}` +
    `&minPrice=${p.minPrice}`;

  if (p.searchWord !== "") defaultURL += `&searchWord=${p.searchWord}`;
  if (p.selectedCategories.length > 0)
    defaultURL +=
      "&categories=" +
      p.selectedCategories.map((ob) => ob.id).join("&categories=");
  if (p.selectedMarks.length > 0)
    defaultURL +=
      "&marks=" + p.selectedMarks.map((ob) => ob.id).join("&marks=");
  return defaultURL;
};

const useURL = (props: useURLProps): string => {
  const [URL, setURL] = useState<string>(generateURL(props));

  const changeURL = useCallback(() => {
    setURL(generateURL(props));
  }, [props]);

  useEffect(() => {
    changeURL();
  }, [changeURL]);

  return URL;
};

export default useURL;
