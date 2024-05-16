import { Dispatch, SetStateAction } from "react";
import { IDelivery } from "../../../../api/types/IDelivery";
import { InpostPoint } from "../../../../components/inpost-widget/InpostPointType";
import { IFinalOrder } from "../../types/IFinalOrder.ts";

export type OrderContextReturns = {
  asGuest: boolean;
  stage: number;
  selectedDelivery: IDelivery | undefined;
  availableDeliveries: IDelivery[];
  wantInvoice: boolean;
  selectedParcel: InpostPoint | undefined;
  finalOrder: IFinalOrder;

  setAsGuest: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setSelectedDelivery: Dispatch<SetStateAction<IDelivery | undefined>>;
  setAvailableDeliveries: Dispatch<SetStateAction<IDelivery[]>>;
  setWantInvoice: Dispatch<SetStateAction<boolean>>;
  setSelectedParcel: Dispatch<SetStateAction<InpostPoint | undefined>>;
  setFinalOrder: Dispatch<SetStateAction<IFinalOrder>>;
};
