import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { OrderContextReturns } from "./types/OrderContextReturns";
import { AccountContext } from "../../account/context/AccountContext";
import { useSessionStorage } from "../../../hooks/useStorage";

export const OrderContext = createContext<OrderContextReturns>(
  {} as OrderContextReturns,
);

export const OrderProvider = ({ children }: PropsWithChildren) => {
  const { isLogged } = useContext(AccountContext);
  const [stage, setStage] = useSessionStorage("order-stage", 0);
  const [asGuest, setAsGuest] = useSessionStorage<boolean | undefined>(
    "order-guest",
    undefined,
  );

  useEffect(() => {
    if (isLogged()) {
      setAsGuest(false);
    } else {
      setAsGuest(undefined);
    }
  }, [isLogged, setAsGuest]);

  return (
    <OrderContext.Provider
      value={{
        asGuest,
        stage,

        setStage,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
