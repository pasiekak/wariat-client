import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AccountContent = (props) => {
    const { t } = useTranslation(null, { keyPrefix: 'components.account' });


    return (
        <div className='AccountContent'>
            <div className='accountAttributes'>
                <p>{t('username')}: {props.user.username}</p>
                <p>{t('email')}: {props.user.email}</p>
                <p>{t('firstName')}: {props.user.firstName}</p>
                <p>{t('lastName')}: {props.user.lastName}</p>
            </div>
            {props.mod ? 
                <div className='moderatorContent'>
                <Link to='/dashboard'>{t('dashboard-message')}</Link>
                </div>
            : null}
        </div>
    )
}

export default AccountContent;