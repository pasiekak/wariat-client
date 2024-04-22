import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { uuid } from "../../../utils/uuid";

const usePortal = ({
  hidden,
  setHidden,
}: {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loaded, setLoaded] = useState(false);
  const [portalID] = useState(`portal-${uuid()}`);

  useEffect(() => {
    setLoaded(false);
    if (!hidden) {
      const div = document.createElement("div");
      div.id = portalID;
      div.className = "portal";
      div.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) setHidden(true);
      });
      document.getElementsByTagName("body")[0].prepend(div);

      setLoaded(true);

      return () => {
        document.getElementsByTagName("body")[0].removeChild(div);
      };
    }
  }, [portalID, hidden, setHidden]);

  return { loaded, portalID };
};

export default usePortal;
