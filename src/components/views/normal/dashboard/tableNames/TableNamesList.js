import './table-names-list.css';
import { NavLink } from "react-router-dom";

const TableNamesList = () => {

    return (
        <div className="TableNamesList">
            <NavLink to='users'>Użytkownicy</NavLink>
            <NavLink to='products'>Produkty</NavLink>
            <NavLink to='categories'>Kategorie</NavLink>
            <NavLink to='marks'>Marki</NavLink>
            <NavLink to='discounts'>Discounts</NavLink>
        </div>
    )
}

export default TableNamesList;