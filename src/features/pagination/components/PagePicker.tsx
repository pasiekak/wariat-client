import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

type pagePickerProps = {
  currentPage: number;
  maxPage: number;
  loading: boolean;
  changePage: (
    direction:
      | "next"
      | "previous"
      | "double next"
      | "double previous"
      | "first"
      | "last",
  ) => void;
};

const PagePicker = (props: pagePickerProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.pagination",
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="page-picker">
      <Button
        variant="dark"
        className="pick first"
        disabled={props.currentPage === 1 || props.loading}
        onClick={() => props.changePage("first")}
      >
        {isMobile ? t("first-page-short") : t("first-page")}
      </Button>
      <FontAwesomeIcon
        className={`pick double previous${props.currentPage - 2 <= 0 || props.loading ? " disabled" : ""}`}
        icon={faAnglesLeft}
        onClick={() => props.changePage("double previous")}
      />
      <FontAwesomeIcon
        className={`pick previous${props.currentPage - 1 <= 0 || props.loading ? " disabled" : ""}`}
        icon={faAngleLeft}
        onClick={() => props.changePage("previous")}
      />
      <div className="page-now">{props.currentPage}</div>
      <FontAwesomeIcon
        className={`pick next${props.currentPage + 1 >= props.maxPage || props.loading ? " disabled" : ""}`}
        icon={faAngleRight}
        onClick={() => props.changePage("next")}
      />
      <FontAwesomeIcon
        className={`pick double next${props.currentPage + 2 >= props.maxPage || props.loading ? " disabled" : ""}`}
        icon={faAnglesRight}
        onClick={() => props.changePage("double next")}
      />
      <Button
        variant="dark"
        className="pick last"
        disabled={props.currentPage === props.maxPage || props.loading}
        onClick={() => props.changePage("last")}
      >
        {isMobile ? t("last-page-short") : t("last-page")}
      </Button>
    </div>
  );
};

export default PagePicker;
