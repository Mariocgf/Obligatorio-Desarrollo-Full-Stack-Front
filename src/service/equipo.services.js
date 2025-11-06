import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_URI_API}v1/equipo`;

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

const equipoServices = {
    obtenerEquipos: async () => {
        const response = await API.get('/');
        return response.data;
    },
    obtenerEquipo: async (id) => {
        const response = await API.get(`/${id}`);
        return response.data;
    }
}

export default equipoServices
