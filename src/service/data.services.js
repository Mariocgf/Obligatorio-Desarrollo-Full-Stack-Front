import axios from "axios";

const url = `${import.meta.env.VITE_API_URL}/data`;

const API = axios.create({
    baseURL: url,
    withCredentials: true
})

const dataServices = {
    datoCant: async (data) =>{
        const response = await API.get(`/datos-cant`, data);
        return response.data;
    }
}

export default dataServices