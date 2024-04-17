import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { OrderContextReturns } from "./types/OrderContextReturns";
import { AccountContext } from "../../account/context/AccountContext";
import { useSessionStorage } from "../../../hooks/useStorage";
import { IDelivery } from "../../../api/types/IDelivery";
import axios from "axios";

export const OrderContext = createContext<OrderContextReturns>(
  {} as OrderContextReturns,
);

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const { isLogged } = useContext(AccountContext);
  const [asGuest, setAsGuest] = useSessionStorage<boolean>("order-guest", true);
  const [selectedDelivery, setSelectedDelivery] = useSessionStorage<
    IDelivery | undefined
  >("order-selected-delivery", undefined);

  const [stage, setStage] = useState<number>(0);
  const [availableDeliveries, setAvailableDeliveries] = useState<IDelivery[]>(
    [],
  );

  useEffect(() => {
    axios.get(`/api/delivery`).then((res) => {
      if (res.status === 200) {
        setAvailableDeliveries(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (isLogged()) {
      setAsGuest(false);
    } else {
      setAsGuest(true);
    }
  }, [isLogged, setAsGuest]);

  return (
    <OrderContext.Provider
      value={{
        asGuest,
        stage,
        selectedDelivery,
        availableDeliveries,

        setAsGuest,
        setStage,
        setSelectedDelivery,
        setAvailableDeliveries,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
