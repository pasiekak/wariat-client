import axios from 'axios';

const accountActions = {
    verifyEmailCodeAndRegister: async (newUser, code) => {
        try {
            let response = await axios.post('/api/auth/register', { newUser, code });
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            } else if (err.response?.status === 401 || err.response?.status === 403) { 
                return err.response.data
            } 
            else {
                return { success: false, message: 'error' };
            }
        }   
    },
    login: async (username, password) => {
        try {
            let response = await axios.post('/api/auth/login', {username, password})
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            } else if (err.response?.status) { 
                return err.response.data
            } 
            else {
                return { success: false, message: 'error' };
            }
        }
    },
    logout: async () => {
        axios.delete('/api/auth/logout').then(() => {
            alert('Wylogowano pomyślnie.');
        }).catch((err) => {
            alert('Coś poszło nie tak..')
        })
    },
    checkIfUserExists: async (username, email) => {
        try {
            let response = await axios.post('/api/auth/checkIfUserExists', { username, email });
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
    sendVerificationEmail: async (email) => {
        try {
            let response = await axios.post('/api/auth/sendEmail', { email });
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' };
            }
        }
    },
    verifyModerator: async() => {
        try {
            let response = await axios.get('/moderator');
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            } else if (err.response.status) {
                return { success: false, message: err.response.data };
            } else {
                return { success: false, message: 'error' };
            }
        }
    },
    verifyLoggedAccount: async () => {
        try {
            let response = await axios.get('/auth');
            return response.data;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            } else if (err.response.status) {
                return { success: false, message: err.response.data };
            } else {
                return { success: false, message: 'error' };
            }
        }
    },
    personalData: {
        updatePhoneNumber: async (phoneNumber) => {
            return performUpdate('/api/personalData', { phone: phoneNumber });
        },
        updateFirstLastName: async (firstName, lastName) => {
            return performUpdate('/api/personalData', { firstName, lastName });
        }
    },
    address: {
        updateCountry: async (country) => {
            return performUpdate('/api/addresses', { country });
        },
        updateCity: async (city) => {
            return performUpdate('/api/addresses', { city });
        },
        updateStreet: async (street) => {
            return performUpdate('/api/addresses', { street });
        },
        updateHomeNumber: async (homeNumber) => {
            return performUpdate('/api/addresses', { homeNumber });
        },
        updatePostalCode: async (postalCode) => {
            return performUpdate('/api/addresses', { postalCode });
        }
    },
    companyData: {
        updateCompanyName: async (companyName) => {
            return performUpdate('/api/companyData', { companyName });
        },
        updateNIP: async (nip) => {
            return performUpdate('/api/companyData', { nip });
        },
        updateCountry: async (country) => {
            return performUpdate('/api/companyData', { country });
        },
        updateCity: async (city) => {
            return performUpdate('/api/companyData', { city });
        },
        updateStreet: async (street) => {
            return performUpdate('/api/companyData', { street });
        },
        updateBuildingNumber: async (buildingNumber) => {
            return performUpdate('/api/companyData', { buildingNumber });
        },
        updatePostalCode: async (postalCode) => {
            return performUpdate('/api/companyData', { postalCode });
        },
        updateAll: async (companyData) => {
            return performUpdate('/api/companyData',companyData);
        },
        getDataByNIP: async (nip) => {
            try {
                let response = await axios.get(`/api/companyData/byNip/${nip}`);
                if(response.status === 200) {
                    return { success: true, data: response.data }
                } else if (response.status === 204) {
                    return { success: false, message: 'company-with-this-nip-not-found'}
                }
            } catch (err) {
                if(err.response.status === 400) {
                    return { success: false, message: 'nip-invalid'}
                } else {
                    return { success: false, message: 'failed' }
                }
            }
        }
    }
}
async function performUpdate(url, data) {
    try {
        const response = await axios.put(url, data);
        return response;
    } catch (err) {
        return handleUpdateError(err);
    }
}
function handleUpdateError(err) {
    if (err.response?.status === 500) {
        return { success: false, message: 'serverError' };
    } else if (err.response.status) {
        return err.response.data;
    } else {
        return { success: false, message: 'error' };
    }
}
export default accountActions