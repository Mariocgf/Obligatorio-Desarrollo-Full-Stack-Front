import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/usuario`;

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
    },
    getUsuarioBasicInfo: async () => {
        const response = await API.get('/basic-info');
        return response.data;
    },
    validarToken: async () => {
        const response = await API.get('/validar-token');
        return response.data;
    }
}

export default usuarioServices
