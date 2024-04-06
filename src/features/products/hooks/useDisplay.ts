import { useDisplayReturns } from "../types/useDisplayReturns";
import { useSessionStorage } from "../../../hooks/useStorage";

const useDisplay = (): useDisplayReturns => {
  const [display, setDisplay] = useSessionStorage<"grid" | "list">(
    "products-display",
    "grid",
  );

  const changeDisplay = (display: "grid" | "list") => {
    setDisplay(display);
  };

  return { display, changeDisplay };
};

export default useDisplay;
