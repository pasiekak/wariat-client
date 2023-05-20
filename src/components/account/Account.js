import React, { useEffect, useState } from 'react';
import './account.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Account = () => {
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        axios.get('/login').then(res => {
            if(res.data.user.isAdmin) {
                setAdmin(true);
            }
        })
    }, []);

    return (
        <div className="Account">
            in construction
            {admin && <Link to="/dashboard">Dashboard</Link>}
        </div>
    );   
}

export default Account;