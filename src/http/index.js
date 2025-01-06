import axios from "axios";

import { API_URL } from "../utils/constants";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((cfg) => {
    cfg.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return cfg;
});

export default $api;