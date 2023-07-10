import { useTranslation } from "react-i18next";

import './table-names-list.css';
import { NavLink } from "react-router-dom";

const TableNamesList = () => {
    const { t: tTables } = useTranslation("dashboard", {keyPrefix: 'dashboard.tables'})

    return (
        <div className="TableNamesList">
            <NavLink to='users'>{tTables('users')}</NavLink>
            <NavLink to='products'>{tTables('products')}</NavLink> 
            <NavLink to='images'>{tTables('images')}</NavLink>
            <NavLink to='categories'>{tTables('categories')}</NavLink>
        </div>
    )
}

export default TableNamesList;