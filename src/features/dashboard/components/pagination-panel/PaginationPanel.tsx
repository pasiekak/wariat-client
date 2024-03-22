import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import "../../styles/pagination-panel.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface PaginationPanelProps {
  itemsCount: number;
  page: number;
  perPage: number;
  maxPage: number;
  incPage: () => void;
  decPage: () => void;
  setNumberOfItemsDisplayed: (numberOfItemsDisplayed: number) => void;
}

const renderLocations = ["/dashboard/products", "/dashboard/users"];

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
  const [decClicked, setDecClicked] = useState(false);
  const [incClicked, setIncClicked] = useState(false);

  const handleClick = (
    incdec: () => void,
    set: (x: boolean) => void,
    prev: boolean,
  ) => {
    if (!prev) {
      set(true);

      setTimeout(() => {
        set(false);
      }, 500);
    }
    incdec();
  };
  const checkIfLocationIsValid = () => {
    return renderLocations.includes(location.pathname);
  };

  if (itemsCount > 0 && checkIfLocationIsValid()) {
    return (
      <div className="pagination-panel">
        <div className="page-manager">
          <FontAwesomeIcon
            className={`
              dec${page === 1 ? ` disabled${decClicked ? " clicked" : ""}` : ""}
            `}
            icon={faCaretLeft}
            onClick={() => handleClick(decPage, setDecClicked, decClicked)}
          />
          <span>
            Aktualna strona: {page}/{maxPage}
          </span>
          <FontAwesomeIcon
            className={`
              inc${page === maxPage ? ` disabled${incClicked ? " clicked" : ""}` : ""}
            `}
            icon={faCaretRight}
            onClick={() => handleClick(incPage, setIncClicked, incClicked)}
          />
        </div>
        <div className="item-number-manager">
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(10)}
            disabled={perPage === 10}
          >
            10
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(20)}
            disabled={perPage === 20}
          >
            20
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(40)}
            disabled={perPage === 40}
          >
            40
          </Button>
          <Button
            variant="dark"
            onClick={() => setNumberOfItemsDisplayed(80)}
            disabled={perPage === 80}
          >
            80
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PaginationPanel;
