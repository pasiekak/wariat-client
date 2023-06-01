import { useState } from 'react';
import { useForm, FormProvider, useFormContext, Form } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import accountActions from '../../../../../api/accountActions';
import { registerSchema } from './registerSchema';
import { NestedFirstForm } from './nestedForms/FirstForm';
import { NestedSecondForm } from './nestedForms/SecondForm';
import './registerMultiForm.css';

const RegisterMultiForm = () => {
    const methods = useForm(
        {
            mode: 'onSubmit',
            reValidateMode: 'onChange',
            defaultValues: {},
            resolver: yupResolver(registerSchema)
        }
    );
    const [step, setStep] = useState(1);

    const navigate = useNavigate();
    const { t } = useTranslation('forms', { keyPrefix: 'forms.register' })
    const { t: tErr } = useTranslation('schemas', { keyPrefix: 'schemas.register' })
    const { t: tApi } = useTranslation('apiMessages', { keyPrefix: 'apiMessages.register'})
    
    methods.t = t;
    methods.tErr = tErr;

    const incStep = async () => { 
        let ok = await methods.trigger()
        if(ok) setStep(step + 1); 
    }
    const decStep = () => setStep(step - 1);

    const onSubmit = async data =>  {
        let res = await accountActions.checkIfUserExists(data.username, data.email);
        if(res.success) {
            if (res.exists) {
                alert(tApi(res.message))
            } else {
                res = await accountActions.sendVerificationEmail(data.email);
                navigate('/email-verification', { state: {data} })
            }
        } else {
            alert(tApi(res.message));
        }
    }
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} autoComplete='off' className='RegisterMultiForm'>
                <h1>{t('title')}</h1>
                {step === 1 ? <NestedFirstForm/> : null}
                {step === 2 ? <NestedSecondForm/> : null}
                
                {step === 2 ? <input type='submit' className='submitButton' value={t('button')}/> : null}
                
                <div className='stepButtons'>
                    <button type='button' onClick={decStep}
                    disabled={step === 1 ? true:false}>{t('buttonPrev')}</button>
                    <button type='button' onClick={incStep}
                    disabled={step === 2 ? true:false}>{t('buttonNext')}</button>
                </div>
                

                
                
            </form>
        </FormProvider>
    );
}

export default RegisterMultiForm;