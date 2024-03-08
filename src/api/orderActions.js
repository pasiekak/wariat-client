import axios from "axios";

const orderActions = {
  makeOrder: async (order) => {
    return await reqMaker(axios.post, "/api/order", order);
  },
  getOrder: async (orderID) => {
    return await reqMaker(axios.get, `/api/order/${orderID}`);
  },
  getOrderStatistics: async () => {
    return await reqMaker(axios.get, "/api/order/statistics");
  },
  getOrders: async () => {
    return await reqMaker(axios.get, "/api/order");
  },
  getUserOrders: async (username) => {
    return await reqMaker(axios.get, `/api/order/user/${username}`);
  },
  updateOrder: async (orderID, data) => {
    return await reqMaker(axios.post, `/api/order/${orderID}`, data);
  },
  getPaymentDocs: async () => {
    axios
      .get("/api/order/paymentDocument", { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Dane_do_przelewu.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  },
};

const reqMaker = async (reqFunction, url, data) => {
  try {
    const response = await reqFunction(url, data);
    return response.data;
  } catch (err) {
    return errHandler(err);
  }
};

const errHandler = (err) => {
  const knownStatus = [404, 403, 400];
  if (err.response && knownStatus.includes(err.response.status))
    return { success: false, message: err.response?.data?.message };
  return { success: false, message: "server-error" };
};

export default orderActions;
