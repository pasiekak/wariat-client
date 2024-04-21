import { ICompanyDataForOrder } from "../../../../../api/types/ICompanyData";
import { IAddressForOrder } from "../../../../../api/types/IAddress";

export type FormFields = {
  delivery: string;
  companyData: ICompanyDataForOrder | null;
  receiverData: ReceiverDataType;
  address: IAddressForOrder | null;
  parcel?: string;
};

type ReceiverDataType = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
};
