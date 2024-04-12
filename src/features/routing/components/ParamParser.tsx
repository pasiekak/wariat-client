import React, { PropsWithChildren, ReactElement } from "react";
import { Navigate, useParams } from "react-router-dom";
import { parseNumberParam } from "../utils/paramParser";

const ParamParser = <T extends { id: number }>(
  props: PropsWithChildren<{ children: ReactElement<T> }>,
) => {
  const { id } = useParams();

  const parsedID = parseNumberParam(id);

  if (!parsedID) {
    return <Navigate to={"/not-found"} replace={true} />;
  }

  return React.cloneElement(props.children, { id: parsedID });
};

export default ParamParser;
