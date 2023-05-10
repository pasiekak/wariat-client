import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import '../styles/LoginForm.css';
const LoginForm = () => {
    const schema = Yup.object().shape({
        login: Yup.string()
        .required("Login jest wymagany"),
        password: Yup.string()
        .required('Hasło jest wymagane')
    });

    return (
        <div className='LoginPage'>
            <div className='Logo'>

            </div>
            <div className='LoginForm'>
                <Formik
                    validationSchema={schema}
                    initialValues={{login:'',password:''}}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values));
                    }}
                >   
                    {({ errors, touched }) => (
                        <Form autoComplete='off'>
                        <h1>Logowanie</h1>
                        <label htmlFor='login'>Login</label>
                        <Field id='login' name='login' type='text'/>
                        {errors.login && touched.login ? (
                            <div className='error'>{errors.login}</div>
                        ) : <div></div>}
                        <label htmlFor='password'>Password</label>
                        <Field id='password' name='password' type='password'/>
                        {errors.password && touched.password ? (
                            <div className='error'>{errors.password}</div>
                        ) : <div></div>}
                        <button type='submit'>Zaloguj się</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default LoginForm;