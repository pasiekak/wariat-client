import * as Yup from 'yup';

export const codeSchema = Yup.object().shape({
    code: Yup.string()
        .required('codeRequired')
        .matches(/^[0-9]+$/, "codeDigitsOnly")
        .min(4, 'codeExactlyFourDigits')
        .max(4, 'codeExactlyFourDigits')
});