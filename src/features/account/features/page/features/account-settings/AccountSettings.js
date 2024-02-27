import { useTranslation } from "react-i18next";

import './account-settings.css';
import Button from "react-bootstrap/Button";

const AccountSettings = ({user, mod}) => {
    const { t } = useTranslation(null, {keyPrefix: 'components.account.account-settings'})

    return (
        <div className="account-settings">
            <h5>{t('title')}</h5>
            <div className="single-property-wrapper">
                <h5>{t('login')}</h5>
                <div className="single-property">
                    <span>{user.username}</span>
                </div>
            </div>
            <div className="single-property-wrapper">
                <h5>{t('email')}</h5>
                <div className="single-property">
                    <span>{user.email}</span>
                </div>
            </div>
            {mod &&
            <div className="single-property-wrapper">
                <h5>{t('dashboard-place')}</h5>
                <div className="single-property">
                    <Button variant="outline-success" href="/dashboard">{t('dashboard-button')}</Button>
                </div>
            </div>}
        </div>
    )
}

export default AccountSettings;