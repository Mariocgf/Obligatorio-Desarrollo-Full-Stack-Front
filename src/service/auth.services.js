import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/auth`;

const API = axios.create({
    baseURL: url,
    withCredentials: true
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const authServices = {
    login: async (data) =>{
        const response = await API.post(`/login`, data);
        return response.data;
    },
    signUp: async (data) => {
        const response = await API.post(`/registro`, data);
        localStorage.setItem('token', response.data.data.token);
    }
}

export default authServices