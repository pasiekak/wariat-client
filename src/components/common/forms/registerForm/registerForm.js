import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import loginApiHandler from '../../../../api/loginApiHandler';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../schemas/registerSchema';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
    const [regSuccess, setRegSuccess] = useState(false);
    const [logSuccess, setLogSuccess] = useState(false);
    const [apiMsg, setApiMsg ] = useState(null);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const schema = registerSchema;

    const register = async(username, password, email, firstName) => {
        let apiResponse = await loginApiHandler.register(username, password, email, firstName);
        setRegSuccess(apiResponse.success);
        setApiMsg(t(apiResponse.message));
    }

    const login = async(username, password) => {
        let apiResponse = await loginApiHandler.login(username, password);
        setLogSuccess(apiResponse.success);
    }

    const handleOnChange = () => {
        setRegSuccess(false);
        setLogSuccess(false);
        setApiMsg(null)
    }

    useEffect(() => {
        if (regSuccess && logSuccess) navigate('/');
    }, [navigate, regSuccess, logSuccess])

    return (
        <div className='RegisterForm'>
            <Formik
                validationSchema={schema}
                initialValues={{username:'',password:'',passwordRepeat:'',email:'',firstName:''}}
                onSubmit={async (values) => {
                    await register(values.username, values.password, values.email, values.firstName);
                    await login(values.username, values.password);
                }}    
            >
                <Form autoComplete='off'
                onChange={handleOnChange}
                > 
                    <h1>{t('registerPage_title')}</h1>
                    <label htmlFor='username'>{t('registerPage_username')}</label>
                        <Field id='username' name='username' type='text'/>
                        <div className='error'><ErrorMessage name='username' render={msg => t(msg)}/></div>
                    <label htmlFor='password'>{t('registerPage_password')}</label>
                        <Field id='password' name='password' type='password'/>
                        <div className='error'><ErrorMessage name='password' render={msg => t(msg)}/></div>
                    <label htmlFor='passwordRepeat'>{t('registerPage_repeatPassword')}</label>
                        <Field id='passwordRepeat' name='passwordRepeat' type='password'/>
                        <div className='error'><ErrorMessage name='passwordRepeat' render={msg => t(msg)}/></div>
                    <label htmlFor='email'>{t('registerPage_email')}</label>
                        <Field id='email' name='email' type='email'/>
                        <div className='error'><ErrorMessage name='email' render={msg => t(msg)}/></div>
                    <label htmlFor='firstName'>{t('registerPage_firstName')}</label>
                        <Field id='firstName' name='firstName' type='text'/>
                        <div className='error'>
                            <ErrorMessage name='firstName' render={msg => t(msg)}/>
                            <p>{apiMsg}</p>
                        </div>
                    <button type='submit'>{t('registerPage_button')}</button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterForm;