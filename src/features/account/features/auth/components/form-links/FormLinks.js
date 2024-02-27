import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import './formLinks.css';

const FormLinks = (props) => {
    const [withRegister] = useState(props.withRegister);
    const [withLogin] = useState(props.withLogin);
    const [color] = useState(props.color || 'rgb(126, 129, 132)')
    const { t } = useTranslation('links', {keyPrefix: 'forms.links' });

    return (
        
        <div className='FormLinks'>
        {withRegister ? 
        <Link to='/register' style={{color: color}}>{t('noAccount')}</Link>
        :
        null}
        {withLogin ?
        <Link to='/login' style={{color: color}}>{t('haveAccount')}</Link>
        :
        null}
        <Link to='/' style={{color: color}}>{t('goBack')}</Link>
        </div>
    )
}

export default FormLinks