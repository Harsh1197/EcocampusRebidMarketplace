import { axiosObject } from "./axios"

export const RegisterUser = async (data) => {
    try {
        const response = await axiosObject.post("/api/users/register", data);
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const UpdateUserStatus = async (id, status) => {
    try {
        const response = await axiosObject.put(`/api/users/update-user-status/${id}`, { status });
        return response.data
    } catch (error) {
        return error.message;
    }
}
export const LoginUser = async (data) => {
    try {
        const response = await axiosObject.post("/api/users/login", data);
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const GetUsers = async () => {
    try {
        const response = await axiosObject.get("/api/users/get-users");
        return response.data
    } catch (error) {
        return error.message;
    }
}
export const ValidateUser = async () => {
    try {
        const response = await axiosObject.get("/api/users/logged-in-user");
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const uploadProfileImage = async (data) => {
    try {
        const response = await axiosObject.post("/api/users/upload-profile-image", data);
        return response.data
    } catch (error) {

        return error.message;
    }
}