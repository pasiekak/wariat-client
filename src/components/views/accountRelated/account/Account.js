import { useEffect, useState, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { AccountContext } from '../../../../context/account';

import accountActions from '../../../../api/accountActions';

import FadeLoader from 'react-spinners/FadeLoader'
import AccountContent from './account-content/AccountContent';

import './account.css';

const Account = () => {
    const { user } = useContext(AccountContext);
    const navigate = useNavigate();
    const [access, setAccess] = useState(false);
    const [cookies] = useCookies();
    const [modAccess, setModAccess] = useState(false);

    useEffect(() => {
        accountActions.verifyLoggedAccount().then(res => {
            if(res.success === false) {
                navigate('/not-logged');
            } else {
                setAccess(true);
                if (cookies.user) {
                    if(['moderator','administrator'].includes(cookies.user?.role)) {
                        setModAccess(true);
                    }
                }
            }
        })
    }, [navigate, cookies])

    return (
        <div className="Account bck-smooth" style={{justifyContent: !user && 'center', alignItems: !user && 'center'}}>
            {access && (user ? <AccountContent mod={modAccess} user={user} /> : <FadeLoader className='loader'/>)}
        </div>
    );   
}

export default Account;