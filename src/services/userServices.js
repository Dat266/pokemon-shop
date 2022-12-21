import axiosInstance from "./axiosInstance";

const userServices = {
    register: (data) =>
        axiosInstance({
            method: "POST",
            url: "/auth/v1/register",
            data,
        }),

    login: (data) =>
        axiosInstance({
            method: "POST",
            url: "/auth/v1/login",
            data,
        }),

    logout: (data) =>
        axiosInstance({
            method: "DELETE",
            url: "/auth/v1/logout",
            headers: { Authorization: `Bearer ${data}` },
        }),
};

export default userServices;
