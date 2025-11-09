import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/deportista`;

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

const deportistaServices = {
    obtenerDeportistas: async () => {
        const response = await API.get('/');
        return response.data;
    },
    obtenerDeportista: async (id) => {
        const response = await API.get(`/${id}`);
        return response.data;
    },
    obtenerDeportistasXEquipo: async (id) => {
        const response = await API.get(`/equipo/${id}`);
        return response.data;
    },
    obtenerDeportistasXCompeticion: async (id) => {
        const response = await API.get(`/competicion/${id}`);
        return response.data;
    }
}

export default deportistaServices
