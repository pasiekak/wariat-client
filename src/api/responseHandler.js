import axios from "axios"

const logout = async () => {
    axios.delete('/logout').then((axiosRes) => {
        if (axiosRes.status === 200) {
            alert('Wylogowano pomyślnie');
        } else {
            console.log('Status to handle: \n', axiosRes);
        }
    }).catch((err) => {
        console.log('Error to handle: \n', err);
    })
}

const responseHandler = {
    logout: logout,
}

export default responseHandler