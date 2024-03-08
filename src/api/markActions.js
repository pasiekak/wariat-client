import axios from "axios";

const markActions = {
  addMark: async (data) => {
    try {
      let response = await axios.post("/api/marks", data);
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
  deleteMark: async (id) => {
    try {
      let response = await axios.delete(`/api/marks/${id}`);
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
  editMark: async (id, newData) => {
    try {
      let response = await axios.put(`/api/marks/${id}`, newData);
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
  getMarkNames: async () => {
    try {
      let response = await axios.get("/api/marks");
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

export default markActions;
