import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom"
import { useCookies } from 'react-cookie';

import accountActions from "../../../../api/accountActions";

import TableNamesDropdown from "./tableNames/TableNamesDropdown";
import Logo from "../../../common/logo/Logo";
import NotLogged from '../../accountRelated/not-logged/Not-logged';

import './dashboard-layout.css';


const DashboardLayout = () => {
    const [access, setAccess] = useState(null);
    const [cookies] = useCookies();
    const verifyAccess = async () => {
        let res = await accountActions.verifyModerator()
        setAccess(res.success);
    }
    useEffect(() => {
        verifyAccess();
    }, [])

    return (
        <>
            {access === true ? 
                <div className="DashboardLayout">
                    <div className="topPanel">
                        <TableNamesDropdown/>
                        <h3>Cześć {cookies.user.username}</h3>
                        <Logo pathTo={'/'}/>
                    </div>
                    <div className="bottomPanel">
                        <Outlet/>
                    </div>
                </div>    
            : <NotLogged/>}
        </>
    ) 
}

export default DashboardLayout;