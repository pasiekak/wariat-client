import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FormLinks = () => {
    const { t } = useTranslation('links', {keyPrefix: 'forms.links' });

    return (
        <div className='FormLinks'>
            <Link to='/register'>{t('formLinks_noAccount')}</Link>
            <Link to='/'>{t('formLinks_goBack')}</Link>
        </div>
    )
}

export default FormLinks