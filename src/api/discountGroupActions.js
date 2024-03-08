import axios from "axios";

const handleAxiosError = (err) => {
  if (err.response) {
    if (err.response.status === 500) {
      return { success: false, message: "serverError" };
    } else if (err.response.status === 401 || err.response.status === 403) {
      return err.response.data;
    }
  }
  return { success: false, message: "error" };
};

const makeRequest = async (method, url, data = null) => {
  try {
    const response = await axios[method](url, data);
    return response.data;
  } catch (err) {
    return handleAxiosError(err);
  }
};

const discountGroupActions = {
  addDiscountGroup: (data) => makeRequest("post", "/api/discountGroups", data),
  deleteDiscountGroup: (id) =>
    makeRequest("delete", `/api/discountGroups/${id}`),
  editDiscountGroup: (id, newData) =>
    makeRequest("put", `/api/discountGroups/${id}`, newData),
};

export default discountGroupActions;
