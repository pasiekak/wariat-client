import { useCallback, useEffect, useState } from "react";

type useDisabledProps = {
  type: string;
};

const useDisabled = (props: useDisabledProps) => {
  const [usersEmpty, setUsersEmpty] = useState(true);
  const [categoriesEmpty, setCategoriesEmpty] = useState(true);
  const [productsEmpty, setProductsEmpty] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const changeUsersEmpty = useCallback(
    (usersCount: number) => {
      setUsersEmpty(usersCount === 0);
    },
    [setUsersEmpty],
  );

  const changeCategoriesEmpty = useCallback(
    (categoriesCount: number) => {
      setCategoriesEmpty(categoriesCount === 0);
    },
    [setCategoriesEmpty],
  );

  const changeProductsEmpty = useCallback(
    (productsCount: number) => {
      setProductsEmpty(productsCount === 0);
    },
    [setProductsEmpty],
  );

  useEffect(() => {
    if (props.type === "user_for_all") {
      setDisabled(usersEmpty);
    } else if (props.type === "user_for_category") {
      setDisabled(usersEmpty || categoriesEmpty);
    } else if (props.type === "user_for_product") {
      setDisabled(usersEmpty || productsEmpty);
    } else if (props.type === "all_users_for_category") {
      setDisabled(categoriesEmpty);
    } else if (props.type === "all_users_for_product") {
      setDisabled(productsEmpty);
    }
  }, [props.type, usersEmpty, categoriesEmpty, productsEmpty, setDisabled]);

  return {
    disabled,
    changeUsersEmpty,
    changeCategoriesEmpty,
    changeProductsEmpty,
  };
};

export default useDisabled;
