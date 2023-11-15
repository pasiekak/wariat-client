import axios from "axios";

const orderActions = {
    makeOrder: async (order) => {
        return await reqMaker(axios.post, '/api/order', order)
    }, 
    getOrder: async (orderID) => {
        return await reqMaker(axios.get, `/api/order/${orderID}`); 
    }
}

const reqMaker = async (reqFunction, url, data) => {
    try {
        const response = await reqFunction(url, data);
        return response.data;
    } catch (err) {
        return errHandler(err);
    }
}

const errHandler = (err) => {
    const knownStatus = [404,403,400]
    if(err.response && knownStatus.includes(err.response.status)) return { success: false, message: err.response?.data?.message }
    return { success: false, message: 'server-error' }
}

export default orderActions;