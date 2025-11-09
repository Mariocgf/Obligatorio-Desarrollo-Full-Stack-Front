import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/competicion`;

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

const competicionServices = {
    obtenerCompeticiones: async () => {
        const response = await API.get('/');
        return response.data;
    },
    obtenerCompeticion: async (id) => {
        const response = await API.get(`/${id}`);
        return response.data;
    },
    obtenerCompeticionXTipo: async (tipo) => {
        const response = await API.get(`/tipo/${tipo}`);
        return response.data;
    },
    obtenerParticipantesXTipoCompeticion: async (tipo) => {
        const response = await API.get(`/${tipo}/Participantes`);
        return response.data;
    }
}

export default competicionServices
