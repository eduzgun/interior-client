import axios from "axios";

let axiosInstance = axios.create({
    baseURL: 'https://lap-4-project.onrender.com'
});

export default axiosInstance;