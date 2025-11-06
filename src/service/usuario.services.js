import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_URI_API}v1/usuario`;

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

const usuarioServices = {
    getCambiosPlan: async () => {
        const response = await API.get('/cambio-plan');
        return response.data;
    },
    registerCambioPlan: async (data) => {
        const response = await API.post('/cambio-plan', data);
        return response.data;
    }
}

export default usuarioServices
