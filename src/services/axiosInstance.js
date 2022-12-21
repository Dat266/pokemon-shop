import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3003",
    timeout: 16000,
});

export default axiosInstance;
