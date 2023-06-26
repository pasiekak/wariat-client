import { useTranslation } from 'react-i18next';

import FormLinks from '../form-links/FormLinks';
import './not-logged.css';

const NotLogged = () => {
    const { t } = useTranslation('account',{ keyPrefix: 'account.notLogged' })


    return (
        <div className="NotLogged">
            {t('message')}
            <FormLinks withLogin={true} withRegister={true} color={'black'}/>
        </div>
    )
}

export default NotLogged;