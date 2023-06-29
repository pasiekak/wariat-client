import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SelectedTable from './tables/SelectedTable';
import TableNamesList from './tables/TableNamesList';
import NotLogged from '../../accountRelated/not-logged/Not-logged';
import accountActions from '../../../../api/accountActions';
import logo from '../../../../images/wariatLogo.png';

import './dashboard.css';

const Dashboard = () => {
    let user = useLocation()?.state?.user;

    const [selectedTable, setSelectedTable] = useState(null);
    const [apiRes, setApiRes] = useState(null);

    const verify = async () => {
        let {success, message} = await accountActions.verifyModerator();
        setApiRes({success, message});
    }

    const handleChange = (tableName) => {
        setSelectedTable(tableName);
    };

    useEffect(() => {    
        verify()
    }, []);

    return (
        <>
            {apiRes?.success ? 
                <div className='Dashboard'>
                    <div className='topPanel'>
                        <Link to="/"><img src={logo} alt="Wariat logo"/></Link>
                        {user && <span>Witaj {user.username}</span>}
                        <span></span>
                    </div>
                    <div className='bottomPanel'>
                        <div className='leftPanel'>
                            <TableNamesList onChange={handleChange}/>
                        </div>
                        <div className='rightPanel'>
                            {selectedTable &&
                            <SelectedTable tableName={selectedTable}/>}
                        </div>
                    </div>
                </div>    
                : <NotLogged message={apiRes?.message}/> }
        </>
    )
}

export default Dashboard;