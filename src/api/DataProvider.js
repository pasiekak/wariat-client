import axios from "axios";

class DataProvider {
    constructor(tableName) {
        this.tableName = tableName;
    }

    getAll = async () => {
        try {
            let response;
            if(this.tableName === 'products') {
                response = await axios.get(`/api/${this.tableName}/admin`);
            } else {
                response = await axios.get(`/api/${this.tableName}`);
            }
            return response.data;
        } catch (err) {
            return { success: false, error: err };
        }
    }
}

export default DataProvider;