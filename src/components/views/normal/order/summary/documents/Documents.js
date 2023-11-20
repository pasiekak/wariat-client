import Button from 'react-bootstrap/Button';

import './documents.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import orderActions from '../../../../../../api/orderActions';

const Documents = ({order}) => {
    const { t } = useTranslation(null, { keyPrefix: 'components.order.summary.documents'});
    const download = (e) => {
        e.preventDefault();
        orderActions.getPaymentDocs();
    };

    return (
        <div className='documents'>
            <span className='title'>{t('title')}</span>
            
            <Button 
            variant='info'
            onClick={(e) => {
                download(e)
            }}>
                {t('payment-methods-btn')}
            </Button>
        </div>
    )
}

export default Documents;