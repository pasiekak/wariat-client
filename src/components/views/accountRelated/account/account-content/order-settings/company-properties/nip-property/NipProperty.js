import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Button from "react-bootstrap/Button";

import accountActions from "../../../../../../../../api/accountActions";

import './nip-property.css';

const schema = yup.object({
    nip: yup.string()
    .required('To pole jest wymagane')
    .matches(/^\d{10}$/, 'Wartość musi zawierać 10 cyfr')
})

const NipProperty = ({companyData}) => {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        defaultValues: {
            nip: companyData.nip ? companyData.nip : ''
        },
        resolver: yupResolver(schema)
    });
    const { t: tCom } = useTranslation(null, { keyPrefix: 'components.account.order-settings.delivery-or-company-properties'})
    const { t: tAcc } = useTranslation(null, { keyPrefix: 'components.account' })
    const [nip, setNIP] = useState(companyData.nip ? companyData.nip : '')
    const [showEditor, setShowEditor] = useState(false);
    const [error, setError] = useState(null);
    
    const onSubmit = (data) => {
        if(isValidNip(data.nip)) {
            setError(null)
            accountActions.companyData.updateNIP(data.nip).then(res => {
                if(res.data.success) {
                    setNIP(data.nip);
                    setShowEditor(false);
                }
            })
        } else {
            setError('Wprowadzono niepoprawny NIP.')
        }
    }

    const isValidNip = (nip) => {
        if(typeof nip !== 'string')
        return false;

        let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
        let sum = 0;
        let controlNumber = parseInt(nip.substring(9, 10));
        let weightCount = weight.length;
        for (let i = 0; i < weightCount; i++) {
            sum += (parseInt(nip.substr(i, 1)) * weight[i]);
        }
        
        return sum % 11 === controlNumber;
    }

    return (
        <div className='single-property-wrapper'>
            <h5>{tCom('nip')}</h5>
            <div className='single-property'>
            {showEditor ?
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="nip-form-input-error">
                        <input {...register("nip")}/>
                        <span>{errors.nip?.message}</span>
                        <span>{error && error}</span>
                    </div>
                    <div className='buttons-wrapper'>
                        <Button variant='outline-dark' onClick={() => {
                            setShowEditor(false); 
                        }}>{tAcc('go-back-button')}</Button>
                        <Button type='submit' variant='outline-dark'>{tAcc('confirm-button')}</Button>
                    </div>
                </form>
                :
                <div className="property-row">
                    <span>
                        {nip ? nip : tAcc('empty-property-message')}
                    </span>
                    <Button variant='outline-dark' onClick={() => setShowEditor(true)}>{tAcc('change-button')}</Button>
                </div>
                }
            </div>
        </div>
    )
}

export default NipProperty;