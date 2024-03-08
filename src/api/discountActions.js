import axios from "axios";

const discountActions = {
  addDiscount: async (data) => {
    try {
      let response = await axios.post("/api/discounts", data);
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        return err.response.data;
      } else {
        return { success: false, message: "error" };
      }
    }
  },
  deleteDiscount: async (id) => {
    try {
      let response = await axios.delete(`/api/discounts/${id}`);
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        return err.response.data;
      } else {
        return { success: false, message: "error" };
      }
    }
  },
  editDiscount: async (id, newData) => {
    try {
      let response = await axios.put(`/api/discounts/${id}`, newData);
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        return err.response.data;
      } else {
        return { success: false, message: "error" };
      }
    }
  },
};

export default discountActions;
