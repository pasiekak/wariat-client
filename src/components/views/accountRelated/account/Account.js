import { useEffect, useState } from 'react';

import accountActions from '../../../../api/accountActions';
import './account.css';


const Account = () => {
    const [modAccess, setModAccess] = useState(false);
    const [notLoged, setNotLoged] = useState(true);
    useEffect(() => {
        accountActions.getAccountType().then(res => {
            if (res.success) {
                setNotLoged(false);
                if (['admin', 'moderator'].includes(res.data)) {
                    setModAccess(true);
                }
            } else {

            }
        })
    }, []);

    return (
        <div className="Account">
            {notLoged ? 
            <p>Nie jesteś zalogowany</p> // TODO: Stworzyć komponent, który będzie się pokazywać w przypadku nieautoryzowanej ścieżki z linkiem do zalogowania
            :
            <>
            {modAccess ? 
                <p>Moderator Kontent</p> // TODO: Normalny kontent ale z linkiem do adminowego dashboardu
                :
                <p>Kontent dla zwykłego klienta</p> // TODO: Stworzyć normalny kontent, na razie wyświetlanie wszystkich danych użytkownika
            }
            </>
            }
            
        </div>
    );   
}

export default Account;