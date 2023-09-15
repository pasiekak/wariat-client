import axios from "axios";

const categoryActions = {
    addCategory: async (data) => {
        try {
            let response = await axios.post('/api/categories', data)
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
    deleteCategory: async (id) => {
        try {
            let response = await axios.delete(`/api/categories/${id}`)
            return response.data
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
    editCategory: async (id, newData) => {
        try {
            let response = await axios.put(`/api/categories/${id}`, newData)
            return response.data
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
    getCategoryNames: async () => {
        try {
            let response = await axios.get('/api/categories')
            return response.data
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
    } 
}

export default categoryActions;