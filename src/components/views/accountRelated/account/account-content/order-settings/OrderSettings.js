import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import './order-settings.css';
import PersonProperties from './person-properties/PersonProperties';
import DeliveryProperties from './delivery-properties/DeliveryProperties';
import CompanyProperties from './company-properties/CompanyProperties';

const OrderSettings = () => {
    const { t } = useTranslation(null, {keyPrefix: 'components.account.order-settings'})
    const [type, setType] = useState('private');

    return (
        <div className="order-settings">
            <h5>{t('title')}</h5>
            <div className='type-picker'>
                <div id='private' 
                style={{backgroundColor: type === 'private' && '#EFCB68'}}
                onClick={() => setType('private')}
                >
                    <span className='type-pick'>{t('private-person')}</span>
                </div>
                <div id='delivery' 
                style={{backgroundColor: type === 'delivery' && '#EFCB68'}}
                onClick={() => setType('delivery')}
                >
                    <span className='type-pick'>{t('delivery-data')}</span>
                </div>
                <div id='company'
                style={{backgroundColor: type === 'company' && '#EFCB68'}}
                onClick={() => setType('company')}>
                    <span className='type-pick'>{t('company')}</span>
                </div>
            </div>
            {type === 'private' && <PersonProperties/>}
            {type === 'delivery' && <DeliveryProperties/>}
            {type === 'company' && <CompanyProperties/>}
            
        </div>
    )
}

export default OrderSettings;