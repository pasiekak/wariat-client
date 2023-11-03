import { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';

import { AccountContext } from '../../../../context/account';
import AccountContent from './account-content/AccountContent';
import NotLogged from '../not-logged/Not-logged';
import './account.css';

const Account = () => {
    const [cookies] = useCookies(['user']);
    const [modAccess, setModAccess] = useState(false);
    const [logged, setLogged] = useState(false);
    const { user, address } = useContext(AccountContext);
    
    useEffect(() => {
        if (cookies.user) {
            setLogged(true);
            if(['moderator','administrator'].includes(cookies.user?.role)) {
                setModAccess(true);
            }
        }
    }, [cookies]);

    return (
        <div className="Account bck-smooth">
            {logged ? 
            (user && <AccountContent mod={modAccess} user={user} address={address}/>)
            :
            <NotLogged/>
            }
            
        </div>
    );   
}

export default Account;