import Dropdown from 'react-bootstrap/Dropdown';

import './table-names-list.css';
import { useNavigate } from 'react-router-dom';

const TableNamesDropdown = () => {
    const navigate = useNavigate();

    return (
        <div className="table-names-dropdown">
            <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    Wybierz tabelę
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('users')}>
                        Użytkownicy
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('products')}>
                        Produkty
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('categories')}>
                        Kategorie
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('marks')}>
                        Marki
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('discounts')}>
                        Zniżki
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate('discountGroups')}>
                        Grupy zniżkowe
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default TableNamesDropdown;