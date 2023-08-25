import { axiosObject } from "./axios"
export const AddNotification = async (data) => {
    try {
        const response = await axiosObject.post("/api/notification/notify-users", data);
        return response.data
    } catch (error) {
        return error.response.data;
    };
}


export const FetchNotification = async () => {
    try {
        const response = await axiosObject.get("/api/notification/get-notifications");
        return response.data
    } catch (error) {
        return error.response.data;
    };
}



export const DeleteNotification = async (id) => {
    try {
        const response = await axiosObject.delete(`/api/notification/delete-notification/${id}`);
        return response.data
    } catch (error) {
        return error.response.data;
    };



}

export const ReadAllNotifications = async () => {
    try {
        const response = await axiosObject.put(`/api/notification/read-notification`);
        return response.data
    } catch (error) {
        return error.response.data;
    };



}
