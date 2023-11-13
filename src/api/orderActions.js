import axios from "axios";

const orderActions = {
    makeOrder: async (order) => {
        let response = await axios.post('/api/order', order)
        console.log(response);
    }
}

export default orderActions;