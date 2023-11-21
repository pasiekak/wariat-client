import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


import './table-names-list.css';

const TableNamesDropdown = () => {
    const navigate = useNavigate();
    const currentTable = sessionStorage.getItem("dashboard-current-table")
    const [selected, setSelected] = useState(currentTable);

    const handleClick = (to, e) => {
        const table = e.target.innerText;
        navigate(to);
        setSelected(table);
        sessionStorage.setItem("dashboard-current-table", table);
    }

    return (
        <div className="table-names-dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    {selected ? selected : 'Wybierz tabelę'}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => handleClick('users', e)}>
                        Użytkownicy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('products', e)}>
                        Produkty
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('orders', e)}>
                        Zamówienia
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('categories', e)}>
                        Kategorie
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('marks', e)}>
                        Marki
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('discounts', e)}>
                        Zniżki
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => handleClick('discountGroups', e)}>
                        Grupy zniżkowe
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TableNamesDropdown;