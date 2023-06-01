import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import './formLinks.css';

const FormLinks = (props) => {
    const [withRegister, setWithRegister] = useState(props.withRegister);
    const { t } = useTranslation('links', {keyPrefix: 'forms.links' });

    return (
        
        <div className='FormLinks'>
        {withRegister ? 
        <Link to='/register'>{t('noAccount')}</Link>
        :
        <Link to='/login'>{t('haveAccount')}</Link>}
            <Link to='/'>{t('goBack')}</Link>
        </div>
    )
}

export default FormLinks