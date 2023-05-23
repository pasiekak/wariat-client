import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
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