import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import AccountContent from './account-content/AccountContent';
import NotLogged from '../not-logged/Not-logged';
import './account.css';

const Account = () => {
    const [cookies] = useCookies(['user']);
    const [modAccess, setModAccess] = useState(false);
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        if (cookies.user) {
            setLogged(true);
            if(['moderator','administrator'].includes(cookies.user?.role)) {
                setModAccess(true);
            }
        }
    }, [cookies]);

    return (
        <div className="Account">
            {logged ? 
            <AccountContent mod={modAccess} user={cookies.user}/>
            :
            <NotLogged/>
            }
            
        </div>
    );   
}

export default Account;