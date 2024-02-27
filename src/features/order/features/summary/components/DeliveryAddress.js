import { useTranslation } from 'react-i18next';
import '../styles/delivery-address.css';

const DeliveryAddress = ({deliveryAddress}) => {
    const { t } = useTranslation(null, {keyPrefix: 'components.order.summary.delivery-address'}) 
    
    return (
        <div className="delivery-address">
            <span className='title'>{t('title')}</span>
            <div>
                <p><span>{t('country')}: </span>{deliveryAddress.country}</p>
                <p><span>{t('city')}: </span>{deliveryAddress.city}</p>
                <p><span>{t('postal-code')}: </span>{deliveryAddress.postalCode}</p>
                <p><span>{t('street')}: </span>{deliveryAddress.street}</p>
                <p><span>{t('home-number')}: </span>{deliveryAddress.homeNumber}</p>
            </div>
        </div>
    )
}

export default DeliveryAddress;