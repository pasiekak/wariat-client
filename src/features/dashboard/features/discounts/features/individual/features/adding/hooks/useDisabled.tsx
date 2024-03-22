import { useEffect, useState } from "react";

type useDisabledProps = {
  type: string;
};

const useDisabled = (props: useDisabledProps) => {
  const [usersEmpty, setUsersEmpty] = useState(true);
  const [categoriesEmpty, setCategoriesEmpty] = useState(true);
  const [productsEmpty, setProductsEmpty] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const changeUsersEmpty = (usersCount: number) => {
    setUsersEmpty(usersCount === 0);
  };

  const changeCategoriesEmpty = (categoriesCount: number) => {
    setCategoriesEmpty(categoriesCount === 0);
  };

  const changeProductsEmpty = (productsCount: number) => {
    setProductsEmpty(productsCount === 0);
  };

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
