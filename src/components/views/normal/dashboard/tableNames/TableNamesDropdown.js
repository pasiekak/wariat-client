import Dropdown from 'react-bootstrap/Dropdown';

import './table-names-list.css';
import { Link } from 'react-router-dom';

const TableNamesDropdown = () => {

    return (
        <div className="table-names-dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    Wybierz tabelę
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link to='users'>Użytkownicy</Link>
                        </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='products'>Produkty</Link>
                        </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='categories'>Kategorie</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='marks'>Marki</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='discounts'>Zniżki</Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to='discountGroups'>Grupy zniżkowe</Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TableNamesDropdown;