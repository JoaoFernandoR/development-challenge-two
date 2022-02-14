import axios from "axios";

const api = axios.create({
    baseURL: "https://uwhiicc2i6.execute-api.sa-east-1.amazonaws.com/v1",
});

export default api;
