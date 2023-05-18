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
                if (response.data.user.type === 'client') {
                    navigate('/');
                }
            } catch (err) {
                setError(`${err.response.status} : ${err.response.data.message}`);
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
        </div>
    )
}

export default Dashboard;