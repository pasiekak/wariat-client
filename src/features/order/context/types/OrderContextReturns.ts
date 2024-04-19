import { Dispatch, SetStateAction } from "react";
import { IDelivery } from "../../../../api/types/IDelivery";

export type OrderContextReturns = {
  asGuest: boolean;
  stage: number;
  selectedDelivery: IDelivery | undefined;
  availableDeliveries: IDelivery[];
  wantInvoice: boolean;

  setAsGuest: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setSelectedDelivery: Dispatch<SetStateAction<IDelivery | undefined>>;
  setAvailableDeliveries: Dispatch<SetStateAction<IDelivery[]>>;
  setWantInvoice: Dispatch<SetStateAction<boolean>>;
};
