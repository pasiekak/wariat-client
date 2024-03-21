import { IBannerWithID } from "../types/IBanner";

import "../styles/banner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faInfo,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import useBannerProgressBar from "../hooks/useBannerProgressBar";

type BannerProps = IBannerWithID & {
  closeBanner: () => void;
  autoCloseTime: number;
};

const Banner = (props: BannerProps) => {
  useBannerProgressBar({ id: props.id, autoCloseTime: props.autoCloseTime });

  const renderIcon = (type: string) => {
    if (type === "info") {
      return <FontAwesomeIcon icon={faInfo} />;
    } else if (type === "success") {
      return <FontAwesomeIcon icon={faCheck} />;
    } else if (type === "warning") {
      return <FontAwesomeIcon icon={faTriangleExclamation} />;
    } else if (type === "error") {
      return <FontAwesomeIcon icon={faXmark} />;
    }
  };

  return (
    <div
      className={`banner ${props.type}`}
      id={props.id}
      onClick={props.closeBanner}
    >
      {renderIcon(props.type)}
      <span>{props.message}</span>
    </div>
  );
};

export default Banner;
