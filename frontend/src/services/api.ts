import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:500', 
});

export default api;