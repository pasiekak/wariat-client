import { useState } from "react";
import { useDisplayReturns } from "../types/useDisplayReturns";

const useDisplay = (): useDisplayReturns => {
  const [display, setDisplay] = useState<"grid" | "list">("grid");

  const changeDisplay = (display: "grid" | "list") => {
    setDisplay(display);
  };

  return { display, changeDisplay };
};

export default useDisplay;
