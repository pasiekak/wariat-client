import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

type ItemsPerPagePickerProps = {
  listOfValues: number[];
  changeFn: (itemsPerPage: number) => void;
  selectedValue: number;
  withText: boolean;
};

const ItemsPerPagePicker = (props: ItemsPerPagePickerProps) => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.pagination",
  });

  return (
    <div className="items-per-page-picker">
      <span className="title">{t("items-per-page-title")}</span>
      {props.listOfValues.map((v, index) => (
        <Button
          variant="dark"
          disabled={props.selectedValue === v}
          className={`per-page-pick${props.selectedValue === v ? " selected" : ""}`}
          onClick={() => props.changeFn(v)}
          key={index}
        >
          {v}
        </Button>
      ))}
    </div>
  );
};

export default ItemsPerPagePicker;
