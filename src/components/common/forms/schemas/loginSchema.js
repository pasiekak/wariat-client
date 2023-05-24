import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
    .required('login_schema_username_required'),
    password: Yup.string()
    .required('login_schema_password_required')
});