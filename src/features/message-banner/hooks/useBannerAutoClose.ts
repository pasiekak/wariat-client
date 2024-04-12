import { IBannerWithID } from "../types/IBanner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseBannerAutoCloseProps = {
  banners: IBannerWithID[];
  setBanners: Dispatch<SetStateAction<IBannerWithID[]>>;
  autoClose: boolean;
  autoCloseTime: number;
};

const useBannerAutoClose = ({
  banners,
  setBanners,
  autoCloseTime,
  autoClose,
}: UseBannerAutoCloseProps) => {
  const [removing, setRemoving] = useState("");

  useEffect(() => {
    if (removing) {
      setBanners((ban) => ban.filter((b) => b.id !== removing));
    }
  }, [removing, setBanners]);

  useEffect(() => {
    if (autoClose && banners.length) {
      const id = banners[banners.length - 1].id;
      setTimeout(() => setRemoving(id), autoCloseTime);
    }
  }, [banners, autoCloseTime, autoClose]);
};

export default useBannerAutoClose;
