import axios from "axios";
const ApiFormData = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

const Api =axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const ApiLogin = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

export const createUserApi = (data) => ApiFormData.post('/api/user/register', data)
export const loginUserApi = (data) => ApiLogin.post('/api/user/login', data)