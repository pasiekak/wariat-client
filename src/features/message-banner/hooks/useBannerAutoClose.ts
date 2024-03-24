import { IBannerWithID } from "../types/IBanner";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseBannerAutoCloseProps = {
  banners: IBannerWithID[];
  setBanners: Dispatch<SetStateAction<IBannerWithID[]>>;
  autoClose: boolean;
  autoCloseTime: number;
};

const useBannerAutoClose = (props: UseBannerAutoCloseProps) => {
  const [removing, setRemoving] = useState("");

  useEffect(() => {
    if (removing) {
      props.setBanners((banners) => banners.filter((b) => b.id !== removing));
    }
  }, [removing, props]);

  useEffect(() => {
    if (props.autoClose && props.banners.length) {
      const id = props.banners[props.banners.length - 1].id;
      setTimeout(() => setRemoving(id), props.autoCloseTime);
    }
  }, [props.banners, props.autoCloseTime, props.autoClose]);
};

export default useBannerAutoClose;
