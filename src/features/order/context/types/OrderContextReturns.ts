import { Dispatch, SetStateAction } from "react";

export type OrderContextReturns = {
  stage: number;
  asGuest: boolean | undefined;

  setStage: Dispatch<SetStateAction<number>>;
};
