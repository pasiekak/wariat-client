import axios from 'axios';
import { loginStatusMsg } from '../constants/statusMessages';

const loginApiHandler = {
    register: async (username, password, email, firstName) => {
        try {
            let response = await axios.post('/register', { username, password, email, firstName });
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' };
            } else if (err.response.status) {
                return err.response.data;
            } else {
                return { success: false, message: 'error' };
            }
        }
    },
    login: async (username, password) => {
        try {
            let response = await axios.post('/login', {username, password})
            return { success: true, message: loginStatusMsg[response.status] };
        } catch (err) {
            if (err.response?.status) {
                return err.response.data
            } else {
                return { success: false, message: 'error' };
            }
        }
    },
    logout: async () => {
        axios.delete('/logout').then(() => {
            alert('Wylogowano pomyślnie.');
        }).catch((err) => {
            alert('Coś poszło nie tak..')
        })
    },
    checkIfUserExists: async (username, email) => {
        axios.post('/checkIfUserExists', {username, email}).then((res) => {
            console.log(res);
            return { success: true, exists: res.data };
        }).catch((err) => {
        
        });
    },
}

export default loginApiHandler