import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router-dom";
import { IOutletContext } from "../../../types/IOutletContext";

const ClearButton = () => {
  const { t } = useTranslation(undefined, {
    keyPrefix: "components.products.filters",
  });
  const context = useOutletContext<IOutletContext>();

  const handleClick = () => {
    context.clearPrices();
    context.clearSearchWord();
    context.clearCategoryFilters();
    context.clearMarkFilters();
  };

  return (
    <Button
      className={"clear-filters-button"}
      disabled={context.loading}
      variant={"outline-dark"}
      onClick={handleClick}
    >
      {t("clear-filters-button")}
    </Button>
  );
};

export default ClearButton;
