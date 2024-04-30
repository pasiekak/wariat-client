import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import {
  AccountContextReturns,
  setAccountDataFNProps,
} from "../types/AccountContextReturns";
import { useSessionStorage } from "../../../hooks/useStorage";
import { IUser } from "../../../api/types/IUser";
import { IAddress } from "../../../api/types/IAddress";
import { IPersonalData } from "../../../api/types/IPersonalData";
import { IAccountDiscounts } from "../types/IAccountDiscounts";
import { ICompanyData } from "../../../api/types/ICompanyData";
import axios from "axios";

export const AccountContext = createContext<AccountContextReturns>(
  {} as AccountContextReturns,
);

export const AccountProvider = ({ children }: PropsWithChildren) => {
  const [cookies, , removeCookie] = useCookies(["user"]);
  const [user, setUser] = useSessionStorage<IUser | null>("account-user", null);
  const [address, setAddress] = useSessionStorage<IAddress | null>(
    "account-address",
    null,
  );
  const [personalData, setPersonalData] =
    useSessionStorage<IPersonalData | null>("account-personal-data", null);
  const [discounts, setDiscounts] = useSessionStorage<IAccountDiscounts | null>(
    "account-discount-group",
    null,
  );
  const [companyData, setCompanyData] = useSessionStorage<ICompanyData | null>(
    "account-company-data",
    null,
  );

  const isAdmin = () => {
    return !!(cookies.user && cookies.user.role === "admin");
  };

  const isModerator = () => {
    return !!(
      cookies.user &&
      (cookies.user.role === "moderator" || cookies.user.role === "admin")
    );
  };

  const isClient = () => {
    return !!(cookies.user && cookies.user.role === "client");
  };

  const isLogged = useCallback(() => {
    return !!cookies.user;
  }, [cookies.user]);

  const setAccountData = useCallback(
    (data: setAccountDataFNProps) => {
      const { user, address, personalData, discounts, companyData } = data;
      setUser(user);
      setAddress(address);
      setPersonalData(personalData);
      setDiscounts(discounts);
      setCompanyData(companyData);
    },
    [setUser, setAddress, setPersonalData, setDiscounts, setCompanyData],
  );

  const clearAccount = useCallback(() => {
    setUser(null);
    setAddress(null);
    setPersonalData(null);
    setDiscounts(null);
    setCompanyData(null);
  }, [setUser, setAddress, setPersonalData, setDiscounts, setCompanyData]);

  const logout = useCallback(async () => {
    try {
      const response = await axios.delete("/api/auth/logout");
      if (response.status === 200) {
        removeCookie("user");
        clearAccount();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }, [removeCookie, clearAccount]);

  useEffect(() => {
    if (
      [user, address, personalData, discounts, companyData].includes(null) &&
      cookies.user
    ) {
      axios.post("/api/auth/login").then((res) => {
        if (res.status === 200) {
          setAccountData(res.data.data);
        }
      });
    }
  }, [
    user,
    address,
    personalData,
    discounts,
    companyData,
    cookies.user,
    setAccountData,
  ]);

  useEffect(() => {
    if (isLogged() && user?.id) {
      axios.get(`/api/users/${user.id}/relatedData`).then((res) => {
        if (res.status === 200) {
          setAccountData(res.data.data);
        }
      });
    } else {
      clearAccount();
    }
  }, [isLogged, setAccountData, user?.id, clearAccount]);

  return (
    <AccountContext.Provider
      value={{
        user,
        address,
        personalData,
        discounts,
        companyData,

        setUser,
        setAddress,
        setPersonalData,
        setDiscounts,
        setCompanyData,
        setAccountData,
        clearAccount,

        isLogged,
        isClient,
        isModerator,
        isAdmin,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
