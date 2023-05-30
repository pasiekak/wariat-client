import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerSchema } from '../schemas/registerSchema';
import { Translation } from 'react-i18next';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            schema: registerSchema,
        }
    }
    render () {
        return (
            <Translation>
                {
                    (t) => 
                    <div className='RegisterForm'>
                        <Formik
                            validationSchema={this.state.schema}
                            initialValues={{username:'',password:'',passwordRepeat:'',email:'',firstName:''}}
                            onSubmit={async (values) => {
                                this.props.onSubmit({ 
                                    username: values.username, 
                                    password: values.password, 
                                    email: values.email, 
                                    firstName: values.firstName 
                                });
                            }}    
                        >
                            <Form autoComplete='off'

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
                                    </div>
                                <button type='submit'>{t('registerPage_button')}</button>
                            </Form>
                        </Formik>
                    </div>    
                }
            </Translation>
        )
    }
}

export default RegisterForm;