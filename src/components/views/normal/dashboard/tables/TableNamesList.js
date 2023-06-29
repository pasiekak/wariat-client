import { useTranslation } from "react-i18next";

import './table-names-list.css';

const TableNamesList = (props) => {
    const { t: tTables } = useTranslation("dashboard", {keyPrefix: 'dashboard.tables'})

    function handleChange(event) {
        props.onChange(event.target.getAttribute('data-value'));
    }

    return (
        <div className="TableNamesList">
            <span data-value='products' onClick={handleChange}>{tTables('products')}</span>
            <span data-value='users' onClick={handleChange}>{tTables('users')}</span>
            <span data-value='images' onClick={handleChange}>{tTables('images')}</span>
            <span data-value='categories' onClick={handleChange}>{tTables('categories')}</span>
        </div>
    )
}

export default TableNamesList;