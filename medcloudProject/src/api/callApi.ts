import api from "./api";

export const callApi = async () => {
    const { data } = await api.get("/pacients");

    return data;
};
