import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";

import './account-settings.css';
import Button from "react-bootstrap/Button";

const AccountSettings = ({user}) => {
    const { t } = useTranslation(null, {keyPrefix: 'components.account.account-settings'})  
    const [ cookies ] = useCookies();

    return (
        <div className="account-settings">
            <h5>{t('title')}</h5>
            <div className="single-property-wrapper">
                <h6>{t('login')}</h6>
                <div className="single-property">
                    <span>{user.username}</span>
                </div>
            </div>
            <div className="single-property-wrapper">
                <h6>{t('email')}</h6>
                <div className="single-property">
                    <span>{user.email}</span>
                </div>
            </div>
            <div className="single-property-wrapper">
                <h6>{t('first-last-name')}</h6>
                <div className="single-property">
                    {(user.firstName || user.lastName) ? <span>{user.firstName} {user.lastName}</span> :
                    <span>{t('no-name-provided')}</span>}
                    
                </div>
            </div>
            {cookies?.user?.role === 'administrator' &&
            <div className="single-property-wrapper">
                <h6>{t('dashboard-place')}</h6>
                <div className="single-property">
                    <Button variant="outline-success" href="/dashboard">{t('dashboard-button')}</Button>
                </div>
            </div>}
        </div>
    )
}

export default AccountSettings;