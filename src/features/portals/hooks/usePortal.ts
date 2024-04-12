import { useEffect, useState } from "react";
import { uuid } from "../../../utils/uuid";

const usePortal = ({ hidden }: { hidden: boolean }) => {
  const [loaded, setLoaded] = useState(false);
  const [portalID] = useState(`portal-${uuid()}`);

  useEffect(() => {
    if (!hidden) {
      const div = document.createElement("div");
      div.id = portalID;
      div.className = "portal";
      document.getElementsByTagName("body")[0].prepend(div);

      setLoaded(true);

      return () => {
        document.getElementsByTagName("body")[0].removeChild(div);
      };
    }
  }, [portalID, hidden]);

  return { loaded, portalID };
};

export default usePortal;
