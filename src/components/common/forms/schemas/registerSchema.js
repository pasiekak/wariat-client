import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    username: Yup.string()
    .required('register_schema_username_required'),
    password: Yup.string()
    .required('register_schema_password_required')
    .matches(/[0-9]/, 'register_schema_password_digits')
    .matches(/[a-z]/, 'register_schema_password_small_letter')
    .matches(/[A-Z]/, 'register_schema_password_big_letter')
    .matches(/[^\w]/, 'register_schema_password_symbol'),
    passwordRepeat: Yup.string()
    .required('register_schema_passwordRepeat_required')
    .oneOf([Yup.ref('password'), null], 'register_schema_passwordRepeat_oneOf'),
    email: Yup.string()
    .email('register_schema_email_invalid')
    .required('register_schema_email_required'),
    firstName: Yup.string().optional(),
});