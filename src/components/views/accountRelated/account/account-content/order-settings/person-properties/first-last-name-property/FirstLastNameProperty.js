import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import accountActions from '../../../../../../../../api/accountActions';

const FirstLastNameProperty = ({personalData}) => {
    const { t: tAcc } = useTranslation(null, {keyPrefix: 'components.account'});
    const { t: tPers } = useTranslation(null, {keyPrefix: 'components.account.order-settings.person-properties'})
    const [tempFirst, setTempFirst] = useState(personalData.firstName || '');
    const [tempLast, setTempLast] = useState(personalData.lastName || '');
    const [firstName, setFirstName] = useState(personalData.firstName || '');
    const [lastName, setLastName] = useState(personalData.lastName || '');
    const [showEditor, setShowEditor] = useState(false);
    const handleChange = (e) => {
        e.preventDefault();
        accountActions.personalData.updateFirstLastName(firstName, lastName).then(res => {
            if(res.data.success) {
                setTempFirst(firstName);
                setTempLast(lastName);
            }
        });
        setShowEditor(false);
    }

    const setDefaultState = () => {
        setFirstName(tempFirst || '');
        setLastName(tempLast || '');
    }

    return (
        <div className='single-property-wrapper'>
            <h5>{tPers('first-last-name')}</h5>
            <div className='single-property'>
                {showEditor ? 
                <Form onSubmit={handleChange}>
                    <Form.Control 
                    placeholder={tPers('first-name-placeholder')} 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                    <Form.Control
                    placeholder={tPers('last-name-placeholder')} 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                    <div className='buttons-wrapper'>
                        <Button variant='outline-dark' 
                        onClick={() => { 
                            setShowEditor(false);
                            setDefaultState();
                        }}>
                            {tAcc('go-back-button')}</Button>
                        <Button type='submit' variant='outline-dark'>{tAcc('confirm-button')}</Button>
                    </div>
                </Form> 
                :
                <div className='property-row'>
                    <span>
                        {(firstName || lastName) ?
                        (firstName + ' ' + lastName) :
                        tPers('no-first-and-last-name-provided')
                        }
                    </span>
                    <Button variant='outline-dark' onClick={() => setShowEditor(true)}>{tAcc('change-button')}</Button>
                </div>
                }
                
            </div>
        </div>
    )

}

export default FirstLastNameProperty;