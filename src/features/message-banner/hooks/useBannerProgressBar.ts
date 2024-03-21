import { useEffect } from "react";

import "../styles/progress-bar.css";

type UseBannerProgressBarProps = {
  id: string;
  autoCloseTime: number;
};
const useBannerProgressBar = (props: UseBannerProgressBarProps) => {
  useEffect(() => {
    const progressDiv = document.createElement("div");
    progressDiv.className = "progress-bar";
    progressDiv.setAttribute(
      "style",
      `animation: progress ${props.autoCloseTime}ms linear;`,
    );

    const banner = document.getElementById(props.id);
    if (banner) banner.append(progressDiv);

    return () => {
      if (banner) banner.removeChild(progressDiv);
    };
  }, []);
};

export default useBannerProgressBar;
