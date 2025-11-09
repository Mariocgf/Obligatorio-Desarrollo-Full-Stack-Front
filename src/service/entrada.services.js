import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/entrada`;

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

const entradaServices = {
    obtenerEntradas: async () => {
        const response = await API.get('/');
        return response.data;
    },
    obtenerEntradasFiltradas: async () => {
        const response = await API.get('/filtro');
        return response.data;
    },
    altaEntrada: async (data) => {
        const response = await API.post('/', data);
        return response.data;
    },
    bajaEntrada: async (id) => {
        const response = await API.delete(`/${id}`);
        return response.data;
    },
    modificarEntrada: async (id, data) => {
        const response = await API.patch(`/${id}`, data);
        return response.data;
    }
}

export default entradaServices
