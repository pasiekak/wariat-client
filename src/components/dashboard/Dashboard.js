import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/wariatLogo.png';
import './dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {    
        const getData = async () => {
            try {
                const response = await axios.get('/api');
                setData(response.data);
                setError(null);
                console.log(response.data);
                if (response.data.user.isAdmin === false) {
                    navigate('/');
                }
            } catch (err) {
                setError(err);
                setData(null);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [navigate]);

    return (
        <div className='Dashboard'>
            <div className='topPanel'>
                <Link to="/"><img src={logo} alt="Wariat logo"/></Link>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {data && <span>Witaj {data.user.username}</span>}
            </div>
            <div className='bottomPanel'>
                <div className='leftPanel'>
                    
                </div>
                <div className='rightPanel'>
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard;