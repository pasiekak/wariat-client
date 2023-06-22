import axios from "axios";

const productsApi = {
    getAllProducts: async () => {
        try {
            let response = await axios.get('/api/products/allProducts');
            return response.data;
        } catch (err) {
            if(err.response?.status === 500) {
                return { success: false, message: 'serverError' }
            }
        }
    }
}

export default productsApi;