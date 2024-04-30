import { IUser } from "../../../api/types/IUser";
import { IAddress } from "../../../api/types/IAddress";
import { IPersonalData } from "../../../api/types/IPersonalData";
import { IAccountDiscounts } from "./IAccountDiscounts";
import { ICompanyData } from "../../../api/types/ICompanyData";
import { Dispatch, SetStateAction } from "react";

export type AccountContextReturns = {
  user: IUser | null;
  address: IAddress | null;
  personalData: IPersonalData | null;
  discounts: IAccountDiscounts | null;
  companyData: ICompanyData | null;

  isAdmin: () => boolean;
  isModerator: () => boolean;
  isClient: () => boolean;
  isLogged: () => boolean;
  logout: () => Promise<boolean>;

  setUser: Dispatch<SetStateAction<IUser | null>>;
  setAddress: Dispatch<SetStateAction<IAddress | null>>;
  setPersonalData: Dispatch<SetStateAction<IPersonalData | null>>;
  setDiscounts: Dispatch<SetStateAction<IAccountDiscounts | null>>;
  setCompanyData: Dispatch<SetStateAction<ICompanyData | null>>;
  setAccountData: setAccountDataFN;
  clearAccount: clearAccountFN;
};

export type setAccountDataFN = (data: setAccountDataFNProps) => void;
export type setAccountDataFNProps = {
  user: IUser;
  address: IAddress;
  personalData: IPersonalData;
  discounts: IAccountDiscounts;
  companyData: ICompanyData;
};

export type clearAccountFN = () => void;
