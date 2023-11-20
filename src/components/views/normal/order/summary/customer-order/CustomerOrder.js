import { useTranslation } from 'react-i18next';
import './customer-order.css';

const CustomerOrder = ({order}) => {
    const { t } = useTranslation(null, {keyPrefix: "components.order.summary.customer-order"})

    return (
        <div className="customer-order">
            <span className='title'>{t('title')}</span>
            <div className='customer-order-details'>
                <div>
                    <span>{t('first-and-last-name')}</span>
                    <span>{order.receiverData.firstName+' '+order.receiverData.lastName}</span>
                </div>
                <div>
                    <span>{t('email')}</span>
                    <span>{order.receiverData.email}</span>
                </div>
                <div>
                    <span>{t('phone')}</span>
                    <span>{order.receiverData.phone}</span>
                </div>
                <div>
                    <span>{t('delivery-type')}</span>
                    <span>{order.deliveryType}</span>
                </div>
            </div>
        </div>
    )
}
export default CustomerOrder;