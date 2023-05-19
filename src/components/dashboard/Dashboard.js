import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
    }, []);

    return (
        <div className='Dashboard'>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {data && data.user.username}
            in construction
        </div>
    )
}

export default Dashboard;