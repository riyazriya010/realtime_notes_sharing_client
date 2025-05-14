import { BACKEND_PORT } from "@/utils/constants"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `${BACKEND_PORT}`,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default axiosInstance;
