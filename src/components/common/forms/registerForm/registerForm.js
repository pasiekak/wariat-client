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
            <Translation keyPrefix='forms.register'>
                {
                    (t) =>
                    <Translation keyPrefix='schemas.register'>
                    {
                        (tErr) => 
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
                                    <h1>{t('title')}</h1>
                                    <label htmlFor='username'>{t('username')}</label>
                                        <Field id='username' name='username' type='text'/>
                                        <div className='error'><ErrorMessage name='username' render={msg => tErr(msg)}/></div>
                                    <label htmlFor='password'>{t('password')}</label>
                                        <Field id='password' name='password' type='password'/>
                                        <div className='error'><ErrorMessage name='password' render={msg => tErr(msg)}/></div>
                                    <label htmlFor='passwordRepeat'>{t('repeatPassword')}</label>
                                        <Field id='passwordRepeat' name='passwordRepeat' type='password'/>
                                        <div className='error'><ErrorMessage name='passwordRepeat' render={msg => tErr(msg)}/></div>
                                    <label htmlFor='email'>{t('email')}</label>
                                        <Field id='email' name='email' type='email'/>
                                        <div className='error'><ErrorMessage name='email' render={msg => tErr(msg)}/></div>
                                    <label htmlFor='firstName'>{t('firstName')}</label>
                                        <Field id='firstName' name='firstName' type='text'/>
                                        <div className='error'>
                                            <ErrorMessage name='firstName' render={msg => tErr(msg)}/>
                                        </div>
                                    <button type='submit'>{t('button')}</button>
                                </Form>
                            </Formik>
                        </div>    
                    }
                </Translation>
                }
            </Translation>
            
        )
    }
}

export default RegisterForm;