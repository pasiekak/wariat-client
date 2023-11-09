import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import PhoneInput from 'react-phone-number-input';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import 'react-phone-number-input/style.css';
import accountActions from '../../../../../../../../api/accountActions';

const PhoneNumberProperty = ({personalData}) => {
    const { t: tAcc } = useTranslation(null, {keyPrefix: 'components.account'});
    const { t: tOrd } = useTranslation(null, {keyPrefix: 'components.account.order-settings.person-properties'})
    const [tempPhone, setTempPhone] = useState(personalData.phone || '');
    const [phoneNumber, setPhoneNumber] = useState(personalData.phone ? personalData.phone : '');

    const [showPhoneEditor, setShowPhoneEditor] = useState(false);
    const handlePhoneNumberChange = (e) => {
        e.preventDefault();
        if(phoneNumber) {
            accountActions.personalData.updatePhoneNumber(phoneNumber).then(res => {
                if(res.data.success) {
                    setTempPhone(phoneNumber)
                }
            });
            setShowPhoneEditor(false);
        }
    }
    
    const setDefault = () => {
        setPhoneNumber(tempPhone || '');
    }

    return (
        <div className='single-property-wrapper'>
            <h5>{tOrd('phone-number')}</h5>
            <div className="single-property">
                {(showPhoneEditor) ? (
                    <Form onSubmit={handlePhoneNumberChange}>
                        <PhoneInput 
                            defaultCountry='PL'
                            value={phoneNumber}
                            onChange={setPhoneNumber}/>
                        <div className='buttons-wrapper'>
                            <Button variant='outline-dark' onClick={() => { 
                                setShowPhoneEditor(false); 
                                setDefault();
                                }}>{tAcc('go-back-button')}</Button>
                            <Button type='submit' variant='outline-dark'>{tAcc('confirm-button')}</Button>
                        </div>
                    </Form>                
                    )
                    :
                    <div className='property-row'>
                        {phoneNumber ? 
                        <span>{phoneNumber}</span> :
                        <span>{tOrd('no-phone-number-provided')}</span>}
                        <Button variant='outline-dark' onClick={() => setShowPhoneEditor(true)}>{tAcc('change-button')}</Button>
                    </div>
                }
                    
            </div>
        </div>
        
    )
}

export default PhoneNumberProperty;