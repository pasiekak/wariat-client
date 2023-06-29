import { useTranslation } from 'react-i18next';

import FormLinks from '../form-links/FormLinks';
import './not-logged.css';

const NotLogged = (props) => {
    const { t } = useTranslation('apiMessages',{ keyPrefix: 'apiMessages.token' })


    return (
        <div className="NotLogged">
            {props.message ? t(props.message) : "Niezalogowany"}
            <FormLinks withLogin={true} withRegister={true} color={'black'}/>
        </div>
    )
}

export default NotLogged;