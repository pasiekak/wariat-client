import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom"
import TableNamesList from "./tableNames/TableNamesList";

import './dashboard-layout.css';
import Logo from "../../../common/logo/Logo";
import accountActions from "../../../../api/accountActions";
import NotLogged from '../../accountRelated/not-logged/Not-logged';

const DashboardLayout = () => {
    const [access, setAccess] = useState(null);
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
                        <Logo/>
                    </div>
                    <div className="bottomPanel">
                        <div className="leftPanel">
                            <TableNamesList/>
                        </div>
                        <div className="rightPanel">
                            <Outlet/>
                        </div>
                    </div>
                </div>    
            : <NotLogged/>}
        </>
    ) 
}

export default DashboardLayout;