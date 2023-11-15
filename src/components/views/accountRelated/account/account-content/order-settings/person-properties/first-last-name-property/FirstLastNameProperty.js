import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import accountActions from '../../../../../../../../api/accountActions';

const FirstLastNameProperty = ({firstName, lastName, updateContextFunction}) => {
    const { t: tAcc } = useTranslation(null, {keyPrefix: 'components.account'});
    const { t: tPers } = useTranslation(null, {keyPrefix: 'components.account.order-settings.person-properties'})
    const [showEditor, setShowEditor] = useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: {
            firstName: firstName,
            lastName: lastName
        }
    })

    const onSubmit = (data) => {
        accountActions.personalData.updateFirstLastName(data.firstName, data.lastName).then(res => {
            if(res.data.success) {
                updateContextFunction('personalData', {firstName: data.firstName, lastName: data.lastName})
                setShowEditor(false);
            }
        });
    }

    return (
        <div className='single-property-wrapper'>
            <h5>{tPers('first-last-name')}</h5>
            <div className='single-property first-last-name-property'>
                {showEditor ? 
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Control 
                    placeholder={tPers('first-name-placeholder')} 
                    {...register('firstName')}/>
                    <Form.Control
                    placeholder={tPers('last-name-placeholder')} 
                    {...register('lastName')}/>
                    <Button variant='outline-dark' 
                    onClick={() => { 
                        setShowEditor(false);
                    }}>
                        {tAcc('go-back-button')}
                    </Button>
                    <Button type='submit' variant='outline-dark'>{tAcc('confirm-button')}</Button>
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