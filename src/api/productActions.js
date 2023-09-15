import axios from "axios";

const productActions = {
    addProduct: async (data) => {
        try {
            let response = await axios.post('/api/products', data)
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
    deleteProduct: async (id) => {
        try {
            let response = await axios.delete(`/api/products/${id}`)
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
    editProduct: async (id, newData) => {
        try {
            let response = await axios.put(`/api/products/${id}`, newData)
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
    getSingleProductCategories: async (id) => {
        try {
            let response = await axios.get('/api/productCategories')
            let finalResponse = response.data.body.filter((row) => row.ProductId === id).map((row) => row.CategoryId);
            return finalResponse
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
    addProductCategory: async (productID, categoryID) => {
        try {
            let response = await axios.post('/api/productCategories', {ProductId: productID, CategoryId: categoryID})
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
    delProductCategory: async (productId, categoryId) => {
        try {
            let response = await axios.delete(`/api/productCategories/${productId}/${categoryId}`)
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

export default productActions;