import "../styles/pick-type.css";
import Dropdown from "react-bootstrap/Dropdown";
import { DropdownButton } from "react-bootstrap";

type PickAddTypeProps = {
  changeForm: (show: boolean, type: string) => void;
  selectedType: string;
};

const PickType = (props: PickAddTypeProps) => {
  return (
    <div className="pick-type discounts-content">
      <DropdownButton
        id="dropdown-basic-button"
        title="Wybierz rodzaj zarządzanej zniżki."
        variant="dark"
      >
        <Dropdown.Item
          onClick={() => props.changeForm(true, "user_for_all")}
          disabled={props.selectedType === "user_for_all"}
        >
          Zarządzanie zniżkami jednego użytkownika na wszystkie produkty.
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => props.changeForm(true, "user_for_category")}
          disabled={props.selectedType === "user_for_category"}
        >
          Zarządzanie zniżkami jednego użytkownika na daną kategorię
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => props.changeForm(true, "user_for_product")}
          disabled={props.selectedType === "user_for_product"}
        >
          Zarządzanie zniżkami jednego użytkownika na dany przedmiot
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => props.changeForm(true, "all_users_for_category")}
          disabled={props.selectedType === "all_users_for_category"}
        >
          Zarządzanie zniżkami wszystkich użytkowników na daną kategorię
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => props.changeForm(true, "all_users_for_product")}
          disabled={props.selectedType === "all_users_for_product"}
        >
          Zarządzanie zniżkami wszystkich użytkowników na dany przedmiot
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default PickType;
