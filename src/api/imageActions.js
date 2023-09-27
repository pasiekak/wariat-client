import axios from "axios"
const imageActions = {
    getImage: async (id) => {
        try {
            let response = await axios.get(`/api/images/${id}`);
            const uint8Array = new Uint8Array(response.data.image.data);
            let base64String = '';
            for (let i = 0; i < uint8Array.length; i++) {
                base64String += String.fromCharCode(uint8Array[i]);
            }
            const imageSource = `data:image/jpeg;base64,${btoa(base64String)}`;
            return imageSource;
        } catch (err) {
            if (err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            } else if (err.response?.status === 401 || err.response?.status === 403) { 
                return err.response.data
            } 
            else {
                console.log(err);
                return { success: false, message: 'error' };
            }
        }
    },
    addImage: async (formData) => {
        try {
            let response = await axios.post('/api/images', formData);
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
    deleteImage: async (id) => {
        try {
            let response = await axios.delete(`/api/images/${id}`);
            return response;
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
export default imageActions