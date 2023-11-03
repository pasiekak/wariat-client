import { useTranslation } from 'react-i18next';

import './order-settings.css';

const OrderSettings = () => {
    const { t } = useTranslation(null, {keyPrefix: 'components.account.order-settings'})

    return (
        <div className="order-settings">
            <h5>{t('title')}</h5>
        </div>
    )
}

export default OrderSettings;