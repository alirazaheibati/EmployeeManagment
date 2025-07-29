
import axios from 'axios'

const API_BASE_URL = "https://online.tsama.ir/apis";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;