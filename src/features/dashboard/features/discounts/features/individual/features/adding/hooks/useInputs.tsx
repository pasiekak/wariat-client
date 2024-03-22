import { useEffect, useState } from "react";

const useInputs = (props: { type: string }) => {
  const [useUsersInput, setUseUsersInput] = useState(
    !props.type.includes("all_users"),
  );
  const [useCategoriesInput, setUseCategoriesInput] = useState(
    props.type.includes("category"),
  );
  const [useProductsInput, setUseProductsInput] = useState(
    props.type.includes("product"),
  );

  // Effect for changing forSingleUser state
  useEffect(() => {
    setUseUsersInput(!props.type.includes("all_users"));
  }, [props.type]);

  //Effect for changing forSingleCategory state
  useEffect(() => {
    setUseCategoriesInput(props.type.includes("category"));
  }, [props.type]);

  //Effect for changing forSingleProduct state
  useEffect(() => {
    setUseProductsInput(props.type.includes("product"));
  }, [props.type]);

  return { useUsersInput, useCategoriesInput, useProductsInput };
};

export default useInputs;
