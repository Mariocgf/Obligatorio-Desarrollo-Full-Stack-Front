import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_URI_API}v1/auth`;

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
        const response = await API.post(`auth/login`, data);
        localStorage.setItem('token', response.data.data.token);
    },
    signUp: async (data) => {
        const response = await API.post(`auth/registro`, data);
        localStorage.setItem('token', response.data.data.token);
    }
}

export default authServices