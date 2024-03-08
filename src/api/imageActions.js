import axios from "axios";
const imageActions = {
  getImage: async (id) => {
    try {
      let response = await axios.get(`/api/images/${id}`);
      return response;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        return err.response.data;
      } else {
        console.log(err);
        return { success: false, message: "error" };
      }
    }
  },
  addImage: async (formData) => {
    try {
      let response = await axios.post("/api/images", formData);
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
  deleteImage: async (id) => {
    try {
      let response = await axios.delete(`/api/images/${id}`);
      return response;
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
  updateImage: async (id, newData) => {
    try {
      let response = await axios.put(`/api/images/${id}`, newData);
      return response;
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
export default imageActions;
