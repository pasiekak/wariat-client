import React, { useState } from "react";
import * as Yup from 'yup';
import logo from '../images/wariatLogo.png';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import '../styles/LRForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [ error, setError ] = useState(null);

    const navigate = useNavigate();

    const schema = Yup.object().shape({
        username: Yup.string().
        required('Nazwa użytkownika jest wymagana'),
        password: Yup.string().
        required('Hasło jest wymagane')
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

    const register = async({username, password, email, firstName}) => {
        axios.post('/register', {username, password, email, firstName}).then((axiosRes) => {
            setError(null);
            axios.post('/login', {username, password}).then((res) => {
                setError(null);
                navigate('/');
            }).catch((err) => {
                setError(err);
            })
        }).catch((err) => {
            setError(err);
        });
    }

    return (
        <div className='RegisterPage'>
            <div className="Logo">
                <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
            </div>
            <div className="form">
                <Formik
                    validationSchema={schema}
                    initialValues={{username:'',password:'',passwordRepeat:'',email:'',firstName:''}}
                    onSubmit={(values) => {
                        register(values);
                    }}    
                >
                    {({ errors, touched }) => (
                        <Form autoComplete='off'> 
                        <h1>Rejestracja</h1>
                        <label htmlFor='username'>Nazwa użytkownika</label>
                        <Field id='username' name='username' type='text'/>
                        {errors.username && touched.username ? (
                            <div className='error'>{errors.username}</div>
                        ) : <div></div>}
                        <label htmlFor='password'>Hasło</label>
                        <Field id='password' name='password' type='password'/>
                        {errors.password && touched.password ? (
                            <div className='error'>{errors.password}</div>
                        ) : <div></div>}
                        <label htmlFor='passwordRepeat'>Powtórz hasło</label>
                        <Field id='passwordRepeat' name='passwordRepeat' type='password'/>
                        {errors.passwordRepeat && touched.passwordRepeat ? (
                            <div className='error'>{errors.passwordRepeat}</div>
                        ) : <div></div>}
                        <label htmlFor='email'>Adres email</label>
                        <Field id='email' name='email' type='email'/>
                        {errors.email && touched.email ? (
                            <div className='error'>{errors.email}</div>
                        ) : <div></div>}
                        <label htmlFor='firstName'>Imię</label>
                        <Field id='firstName' name='firstName' type='text'/>
                        {errors.firstName && touched.firstName ? (
                            <div className='error'>{errors.firstName}</div>
                        ) : <div></div>}
                        <button type='submit'>Zarejestruj się</button>
                        </Form>
                    )}
                </Formik>
                <div className="links">
                    <span>{error && error.message}</span>
                    <Link to='/login'>Masz już konto? Zaloguj się</Link>
                    <Link to='/'>Wróć do strony głównej</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;