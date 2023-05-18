import { React } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';
import '../styles/LoginPage.css';
import { Link } from 'react-router-dom';
import logo from '../images/wariatLogo.png';

const LoginPage = () => {
    const navigate = useNavigate();

    const schema = Yup.object().shape({
        username: Yup.string()
        .required("Nazwa użytkownika jest wymagana"),
        password: Yup.string()
        .required('Hasło jest wymagane')
    });

    const login = async ({username, password}) => {
        axios.post('/api/login', {username, password}).then((axiosRes) => {
            if (axiosRes.data.auth === true) {
                if (axiosRes.data.user.type === 'admin') {
                    navigate('/dashboard');
                } else if (axiosRes.data.user.type === 'client') {
                    navigate('/');
                }
            }
        })
    }

    return (
        <div className='LoginPage'>
            <div className='Logo'>
                <Link to='/'><img src={logo} alt='Wariat logo'/></Link>
            </div>
            <div className='LoginForm'>
                <Formik
                    validationSchema={schema}
                    initialValues={{username:'',password:''}}
                    onSubmit={(values) => {
                        login(values);
                    }}
                >   
                    {({ errors, touched }) => (
                        <Form autoComplete='off'>
                        <h1>Logowanie</h1>
                        <label htmlFor='username'>Nazwa użytkownika</label>
                        <Field id='username' name='username' type='text'/>
                        {errors.username && touched.username ? (
                            <div className='error'>{errors.username}</div>
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

export default LoginPage;