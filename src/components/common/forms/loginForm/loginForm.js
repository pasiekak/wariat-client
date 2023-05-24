import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import loginApiHandler from '../../../../api/loginApiHandler';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const [success, setSuccess] = useState(false);
    const [apiMsg, setApiMsg] = useState(null)
    const { t } = useTranslation();
    const navigate = useNavigate();
    const schema = loginSchema;

    const login = async (username, password) => {
        let apiResponse = await loginApiHandler.login(username, password);
        setSuccess(apiResponse.success);
        setApiMsg(t(apiResponse.message));
    }

    const handleOnChange = () => {
        setSuccess(false);
        setApiMsg(null);
    }

    useEffect(() => {
        if (success) navigate('/');
    }, [success, navigate])

    return (
        <div className='LoginForm'>
            <Formik
                validationSchema={schema}
                initialValues={{username:'',password:''}}
                onSubmit={ async (values) => {
                    await login(values.username, values.password);
                    values.password = '';
                }}
            >   
                <Form autoComplete='off'
                    onChange={handleOnChange}
                >
                    <h1>{t('loginPage_title')}</h1>
                    <label htmlFor='username'>{t('loginPage_username')}</label>
                        <Field id='username' name='username' type='text'/>
                        <div className='error'>
                            <ErrorMessage name='username' render={msg => t(msg)}/>
                        </div>
                    <label htmlFor='password'>{t('loginPage_password')}</label>
                        <Field id='password' name='password' type='password'/>
                        <div className='error'>
                            <ErrorMessage name='password' render={msg => t(msg)}/>
                            <p>{apiMsg}</p>
                        </div>
                    <button type='submit'>{t('loginPage_button')}</button>
                </Form>
            </Formik>
        </div>
    )
}

export default LoginForm;