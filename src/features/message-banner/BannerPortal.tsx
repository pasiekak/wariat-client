import useBannerPortal from "./hooks/useBannerPortal";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useState } from "react";
import { IBanner, IBannerWithID } from "./types/IBanner";

import "./styles/banners-wrapper.css";
import Banner from "./components/Banner";
import { IBannerPortalForwardedFunctions } from "./types/IBannerPortalForwardedFunctions";
import { uuid } from "../../utils/uuid";
import useBannerAutoClose from "./hooks/useBannerAutoClose";

type BannerPortalProps = {
  autoClose: boolean;
  autoCloseTime: number;
};

const BannerPortal = forwardRef<
  IBannerPortalForwardedFunctions,
  BannerPortalProps
>((props, ref) => {
  const { loaded, portalID } = useBannerPortal();
  const portalTarget = document.getElementById(portalID);
  const [banners, setBanners] = useState<IBannerWithID[]>([]);

  useBannerAutoClose({
    banners,
    autoClose: props.autoClose,
    autoCloseTime: props.autoCloseTime,
    setBanners,
  });

  useImperativeHandle(ref, () => ({
    addBanner(banner: IBanner) {
      setBanners((prevBanners) => [...prevBanners, { ...banner, id: uuid() }]);
    },
  }));

  const closeBanner = (id: string) => {
    setBanners((banners) => {
      return banners.filter((b) => b.id !== id);
    });
  };

  return loaded && portalTarget ? (
    createPortal(
      <div className="banners-wrapper">
        {banners.map((banner) => (
          <Banner
            message={banner.message}
            type={banner.type}
            id={banner.id}
            closeBanner={() => closeBanner(banner.id)}
            autoCloseTime={props.autoCloseTime}
            key={banner.id}
          />
        ))}
      </div>,
      portalTarget,
    )
  ) : (
    <></>
  );
});

export default BannerPortal;
