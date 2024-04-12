import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";
import usePortal from "./hooks/usePortal";
import { createPortal } from "react-dom";

import "./styles/positioning.css";

export type forwarded = {
  show: () => void;
  hide: () => void;
};

export type props = {
  child: ReactNode;
};

const PortalToBody = forwardRef<forwarded, props>((props, ref) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const { loaded, portalID } = usePortal({ hidden: hidden });
  const portalTarget = document.getElementById(portalID);

  useImperativeHandle(ref, () => ({
    show() {
      setHidden(false);
    },
    hide() {
      setHidden(true);
    },
  }));

  return loaded && portalTarget && !hidden ? (
    createPortal(props.child, portalTarget)
  ) : (
    <></>
  );
});

export default PortalToBody;
