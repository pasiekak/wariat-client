import { DropdownButton } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Dropdown from "react-bootstrap/Dropdown";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../../types/IOutletContext";

type sortingPickerProps = {
  options: { by: string; direction: "ASC" | "DESC" }[];
};

const SortingPicker = (props: sortingPickerProps) => {
  const context = useOutletContext<IOutletContext>();
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.sorting",
  });

  const handleClick = (option: { by: string; direction: "ASC" | "DESC" }) => {
    context.changeOrderProperty(option.by);
    context.changeOrderDirection(option.direction);
  };

  return (
    <div className="sorting-picker">
      <DropdownButton
        data-bs-theme="dark"
        id="dropdown-basic-button"
        variant="dark"
        title={t(context.orderBy + "-" + context.orderDirection.toLowerCase())}
        disabled={context.loading}
      >
        {props.options.map((opt, index) => (
          <Dropdown.Item key={index} onClick={() => handleClick(opt)}>
            {t(opt.by + "-" + opt.direction.toLowerCase())}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default SortingPicker;
