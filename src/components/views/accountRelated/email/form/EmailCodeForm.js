import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import FadeLoader from 'react-spinners/FadeLoader';

import accountActions from "../../../../../api/accountActions";

import { AccountContext } from "../../../../../context/account";
import { codeSchema } from "./schema";

import './emailCodeForm.css';

const EmailCodeForm = ({regData}) => {
    const { register, handleSubmit, formState: { errors }} = useForm(
        {   
            defaultValues: {code: ''},
            resolver: yupResolver(codeSchema)
        }
    );
    const navigate = useNavigate();
    const { t } = useTranslation('forms', { keyPrefix: 'forms.emailCode' })
    const { t: tErr } = useTranslation('schemas', { keyPrefix: 'schemas.emailCode' })
    const { t: tApi } = useTranslation('apiMessages', { keyPrefix: 'apiMessages.emailCode'})
    const [showSpinner, setShowSpinner] = useState(false);
    const [success, setSuccess] = useState(null);
    const [apiMessage, setApiMessage] = useState(null);
    const { setAccountData } = useContext(AccountContext);
    
    const onSubmit = async data => {
        setShowSpinner(true);
        let response = await accountActions.verifyEmailCodeAndRegister(regData, data.code);
        setShowSpinner(false)

        setSuccess(response.success);
        if(response?.success === false) {
            setApiMessage(response.message)
        } else {
            setApiMessage(response.message)
            let apiResponse = await accountActions.login(regData.username, regData.password);
            if(apiResponse.success) {
                setAccountData(apiResponse.data);
            }
            setTimeout(() => {
                navigate('/')
            }, 1500)
        }
    }


    return (
        <form className="EmailCodeForm" onSubmit={handleSubmit(onSubmit)}>
            <h1>{t('title')}</h1>
            {showSpinner ? <FadeLoader/> : 
            <>
                <label htmlFor="code">{t('codeLabel')}</label>
                <input id="code" {...register('code')} />
                <span>{errors.code ? tErr(errors.code.message) : null}</span>
                <span color={success ? 'green':'red'}>{apiMessage ? tApi(apiMessage) : null}</span>
                <button type="submit">{t('submit')}</button>
            </>}
        </form>
    )
}

export default EmailCodeForm;