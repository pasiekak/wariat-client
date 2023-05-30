import axios from 'axios';
import { loginStatusMsg, registerStatusMsg } from '../constants/statusMessages';

const loginApiHandler = {
    register: async (username, password, email, firstName) => {
        try {
            let response = await axios.post('/register', { username, password, email, firstName });
            return { success: true, message: registerStatusMsg[response.status] }
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: registerStatusMsg['500'] };
            } else if (err.response?.status === 400) {
                return { success: false, message: registerStatusMsg['400'] };
            } else {
                return { success: false, message: registerStatusMsg['error'] };
            }
        }
    },
    login: async (username, password) => {
        try {
            let response = await axios.post('/login', {username, password})
            return { success: true, message: loginStatusMsg[response.status] };
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: loginStatusMsg['500'] };
            } else if (err.response?.status === 400) {
                return { success: false, message: loginStatusMsg['400'] };
            } else if (err.response?.status === 401) {
                return { success: false, message: loginStatusMsg['401'] };
            } else {
                return { success: false, message: loginStatusMsg['error'] };
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