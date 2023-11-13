import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

import accountActions from "../../../../api/accountActions";

import TableNamesDropdown from "./tableNames/TableNamesDropdown";
import Logo from "../../../common/logo/Logo";
import NotLogged from '../../accountRelated/not-logged/Not-logged';

import './dashboard-layout.css';


const DashboardLayout = () => {
    const navigate = useNavigate();
    const [access, setAccess] = useState(null);
    const [cookies] = useCookies();
    useEffect(() => {
        accountActions.verifyLoggedAccount().then(res => {
            if(res.success === false) {
                navigate('/not-logged');
            } else {
                setAccess(true);
            }
        })
    }, [navigate])

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