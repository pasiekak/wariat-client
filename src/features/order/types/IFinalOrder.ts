import { IAddressForOrder } from "../../../api/types/IAddress.ts";
import { ICompanyDataForOrder } from "../../../api/types/ICompanyData.ts";
import { InpostAddressDetails } from "../../../components/inpost-widget/InpostPointType.ts";

export interface IFinalOrder {
  asGuest: boolean;
  wantInvoice: boolean;
  address: IAddressForOrder | null;
  companyData: ICompanyDataForOrder | null;
  receiverData: IReceiverDataForOrder | null;
  delivery: string | null;
  parcel:
    | ({
        code: string;
      } & InpostAddressDetails)
    | null;
  comment: string | null;
  consents: {
    rodo: boolean;
    terms: boolean;
  };
}

export interface IReceiverDataForOrder {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
}
