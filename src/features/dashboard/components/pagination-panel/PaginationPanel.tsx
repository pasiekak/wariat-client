import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "../../styles/pagination-panel.css";
import { useLocation } from "react-router-dom";

interface PaginationPanelProps {
  itemsCount: number;
  page: number;
  perPage: number;
  maxPage: number;
  incPage: () => void;
  decPage: () => void;
  setNumberOfItemsDisplayed: (numberOfItemsDisplayed: number) => void;
}

const PaginationPanel = ({
  itemsCount,
  page,
  perPage,
  maxPage,
  incPage,
  decPage,
  setNumberOfItemsDisplayed,
}: PaginationPanelProps) => {
  const location = useLocation();
  const renderLocations = ["/dashboard/products", "/dashboard/users"];

  const checkIfLocationIsValid = () => {
    return renderLocations.includes(location.pathname);
  };

  if (itemsCount > 0 && checkIfLocationIsValid()) {
    return (
      <div className="pagination-panel">
        <div className="page-manager">
          <FontAwesomeIcon icon={faCaretLeft} onClick={decPage} />
          <span>
            Aktualna strona: {page}/{maxPage}
          </span>
          <FontAwesomeIcon icon={faCaretRight} onClick={incPage} />
        </div>
        <div className="item-number-manager">
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(5)}
            disabled={perPage === 5}
          >
            5
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(10)}
            disabled={perPage === 10}
          >
            10
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(15)}
            disabled={perPage === 15}
          >
            15
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(20)}
            disabled={perPage === 20}
          >
            20
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PaginationPanel;
