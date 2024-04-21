import { Dispatch, SetStateAction } from "react";
import { IDelivery } from "../../../../api/types/IDelivery";
import { InpostPoint } from "../../../../components/inpost-widget/InpostPointType";

export type OrderContextReturns = {
  asGuest: boolean;
  stage: number;
  selectedDelivery: IDelivery | undefined;
  availableDeliveries: IDelivery[];
  wantInvoice: boolean;
  selectedParcel: InpostPoint | undefined;

  setAsGuest: Dispatch<SetStateAction<boolean>>;
  setStage: Dispatch<SetStateAction<number>>;
  setSelectedDelivery: Dispatch<SetStateAction<IDelivery | undefined>>;
  setAvailableDeliveries: Dispatch<SetStateAction<IDelivery[]>>;
  setWantInvoice: Dispatch<SetStateAction<boolean>>;
  setSelectedParcel: Dispatch<SetStateAction<InpostPoint | undefined>>;
};
