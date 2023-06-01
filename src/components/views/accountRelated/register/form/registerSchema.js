import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    username: Yup.string()
    .required('usernameRequired'),
    password: Yup.string()
    .required('passwordRequired')
    .matches(/[0-9]/, 'passwordDigits')
    .matches(/[a-z]/, 'passwordSmallLetter')
    .matches(/[A-Z]/, 'passwordBigLetter')
    .matches(/[^\w]/, 'passwordSymbol'),
    passwordRepeat: Yup.string()
    .required('passwordRepeatRequired')
    .oneOf([Yup.ref('password'), null], 'passwordRepeatOneOf'),
    email: Yup.string()
    .email('emailInvalid')
    .required('emailRequired'),
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional()
});