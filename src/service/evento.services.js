import axios from "axios";

const url = `${process.env.NEXT_PUBLIC_URI_API}v1/evento`;

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

const eventoServices = {
    crearEvento: async (data) => {
        const response = await API.post('/', data);
        return response.data;
    },
    obtenerEventos: async () => {
        const response = await API.get('/');
        return response.data;
    },
    obtenerEventoXTipo: async (tipo) => {
        const response = await API.get(`/${tipo}`);
        return response.data;
    }
}

export default eventoServices
