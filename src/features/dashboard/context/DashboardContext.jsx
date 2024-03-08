import { createContext, useState } from "react";

export const DashboardContext = createContext(undefined);

export const DashboardProvider = ({ children }) => {
  const [products, setProducts] = useState();

  return (
    <DashboardContext.Provider value={{ products, setProducts }}>
      {children}
    </DashboardContext.Provider>
  );
};
