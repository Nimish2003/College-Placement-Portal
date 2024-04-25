import axios from "axios";
import ServerUrl from "../constants.js";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const api = axios.create({
  baseURL: ServerUrl,
});

api.interceptors.request.use(async (req) => {
  const token = Cookies.get("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // localStorage.removeItem('token');
      toast.error("Session Expired! Please Login Again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      // toast.error('Session Expired! Please Login Again.');
      Cookies.remove("token");
      await timeout(2000);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

class Api {
  static async registerUser(data) {
    return await api.post("api/auth/register", data);
  }

  static async loginUser(data) {
    return await api.post("api/auth/login", data);
  }

  static async verifyOtp(data) {
    return await api.post("api/auth/verify-otp", data);
  }

  static async editProfile(data) {
    return await api.patch("api/auth/profile", data);
  }

  static async createAcademic(data) {
    return await api.patch("api/auth/academic", data);
  }

  static async createProfessional(data) {
    try {
      const response = await api.patch("api/auth/professional", data);
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Throw any error that occurs
    }
  }

  static async getUserDetails(data) {
    try {
      const response = await api.post("api/auth/user", data);
      return response.data;
    } catch (error) {
      console.log("Error fetching user details:", error);
      throw error;
    }
  }
}

export default Api;
