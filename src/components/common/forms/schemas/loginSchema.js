import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
    .required("Nazwa użytkownika jest wymagana"),
    password: Yup.string()
    .required('Hasło jest wymagane')
});