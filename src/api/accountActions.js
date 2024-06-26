import axios from "axios";

const accountActions = {
  verifyEmailCodeAndRegister: async (newUser, code) => {
    try {
      let response = await axios.post("/auth/register", { newUser, code });
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
  login: async (username, password) => {
    try {
      let response = await axios.post("/auth/login", {
        username,
        password,
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response?.status) {
        return err.response.data;
      } else {
        return { success: false, message: "error" };
      }
    }
  },
  logout: async () => {
    axios
      .delete("/auth/logout")
      .then(() => {
        alert("Wylogowano pomyślnie.");
      })
      .catch((err) => {
        alert("Coś poszło nie tak..");
      });
  },
  checkIfUserExists: async (username, email) => {
    try {
      let response = await axios.post("/auth/checkIfUserExists", {
        username,
        email,
      });
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      } else if (err.response.status) {
        return err.response.data;
      } else {
        return { success: false, message: "error" };
      }
    }
  },
  sendVerificationEmail: async (email) => {
    try {
      let response = await axios.post("/auth/sendEmail", { email });
      return response.data;
    } catch (err) {
      if (err.response?.status === 500) {
        return { success: false, message: "serverError" };
      }
    }
  },
};

export default accountActions;
