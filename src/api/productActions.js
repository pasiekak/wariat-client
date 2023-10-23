import axios from "axios";

// Wspólna funkcja do obsługi błędów
const handleRequest = async (requestPromise) => {
    try {
        const response = await requestPromise;
        return response.data;
    } catch (err) {
        if (err.response?.status === 500) {
            return { success: false, message: 'serverError' };
        } else if (err.response?.status === 401 || err.response?.status === 403) { 
            return err.response.data;
        } else {
            return { success: false, message: 'error' };
        }
    }
};

const productActions = {
    getAllProducts: async (options) => {
        return handleRequest(axios.get('/api/products', { params: options }));
    },
    addProduct: async (data) => {
        return handleRequest(axios.post('/api/products', data));
    },
    deleteProduct: async (id) => {
        return handleRequest(axios.delete(`/api/products/${id}`));
    },
    editProduct: async (id, newData) => {
        return handleRequest(axios.put(`/api/products/${id}`, newData));
    },
    getProductForeignAttributes: async (attributeType, id) => {
        if (attributeType === 'category') {
            return handleRequest(axios.get(`/api/productCategories/product/${id}`));
        } else if (attributeType === 'mark') {
            return handleRequest(axios.get(`/api/productMarks/product/${id}`));
        }
    },
    getSingleProductImages: async (id) => {
        return handleRequest(axios.get(`/api/images/products/${id}`));
    },
    addProductForeignAttribute: async (attributeType, productID, attributeID) => {
        let path;
        let postBody = {ProductId: productID}
        if (attributeType === 'category') {
            path = '/api/productCategories';
            postBody.CategoryId = attributeID;
        }
        if (attributeType === 'mark') {
            path = '/api/productMarks';
            postBody.MarkId = attributeID
        }
        return handleRequest(axios.post(`${path}`, postBody)); 
    },
    delProductForeignAttribute: async (attributeType, productID, attributeID) => {
        let path;
        if (attributeType === 'category') path = '/api/productCategories';
        if (attributeType === 'mark') path = '/api/productMarks';
        return handleRequest(axios.delete(`${path}/${productID}/${attributeID}`)); 
    }
};

export default productActions;
