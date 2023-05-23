import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import loginApiHandler from '../../../../api/loginApiHandler';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [regSuccess, setRegSuccess] = useState(false);
    const [logSuccess, setLogSuccess] = useState(false);
    const [apiMsg, setApiMsg ] = useState(null);
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        username: Yup.string()
        .required('Nazwa użytkownika jest wymagana'),
        password: Yup.string()
        .required('Hasło jest wymagane')
        .matches(/[0-9]/, 'Hasło musi mieć cyfrę')
        .matches(/[a-z]/, 'Hasło musi mieć małą literę')
        .matches(/[A-Z]/, 'Hasło musi mieć dużą literę')
        .matches(/[^\w]/, 'Hasło musi mieć symbol (np. !@#$%^&*)'),
        passwordRepeat: Yup.string()
        .required('Powtórz hasło')
        .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
        email: Yup.string()
        .email('Niepoprawny adres email')
        .required('Adres email jest wymagany'),
        firstName: Yup.string().optional(),
    });

    const register = async(username, password, email, firstName) => {
        console.log('hello from register');
        let apiResponse = await loginApiHandler.register(username, password, email, firstName);
        setRegSuccess(apiResponse.success);
        setApiMsg(apiResponse.message);
    }

    const login = async(username, password) => {
        console.log('hello from login');
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
                    <h1>Rejestracja</h1>
                    <label htmlFor='username'>Nazwa użytkownika</label>
                    <Field id='username' name='username' type='text'/>
                    <div className='error'><ErrorMessage name='username'/></div>
                    <label htmlFor='password'>Hasło</label>
                    <Field id='password' name='password' type='password'/>
                    <div className='error'><ErrorMessage name='password'/></div>
                    <label htmlFor='passwordRepeat'>Powtórz hasło</label>
                    <Field id='passwordRepeat' name='passwordRepeat' type='password'/>
                    <div className='error'><ErrorMessage name='passwordRepeat'/></div>
                    <label htmlFor='email'>Adres email</label>
                    <Field id='email' name='email' type='email'/>
                    <div className='error'><ErrorMessage name='email'/></div>
                    <label htmlFor='firstName'>Imię</label>
                    <Field id='firstName' name='firstName' type='text'/>
                    <div className='error'>
                        <ErrorMessage name='firstName'/>
                        <p>{apiMsg}</p>
                    </div>
                    <button type='submit'>Zarejestruj się</button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterForm;