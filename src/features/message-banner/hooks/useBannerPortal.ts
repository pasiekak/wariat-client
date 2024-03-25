import { useEffect, useState } from "react";
import { uuid } from "../../../utils/uuid";

import "../styles/banner-portal-positioning.css";

const useBannerPortal = () => {
  const [loaded, setLoaded] = useState(false);
  const [portalID] = useState(`banner-portal-${uuid()}`);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = portalID;
    div.className = "banner-portal";
    document.getElementsByTagName("body")[0].prepend(div);

    setLoaded(true);

    return () => {
      document.getElementsByTagName("body")[0].removeChild(div);
    };
  }, [portalID]);

  return { loaded, portalID };
};

export default useBannerPortal;
