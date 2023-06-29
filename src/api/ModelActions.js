import axios from "axios";

class ModelActions {
    constructor(tableName) {
        this.tableName = tableName;
    }

    getAll = async () => {
        try {
            let response = await axios.get(`/api/${this.tableName}`);
            return response.data;
        } catch (err) {
            return { success: false, error: err };
        }
    }
}

export default ModelActions;