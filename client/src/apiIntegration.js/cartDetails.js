import { axiosObject } from "./axios"
export const AddCartDetails = async (data) => {
    try {
        const response = await axiosObject.post("/api/cart/item-details", data);
        return response.data
    } catch (error) {
        return error.message;
    }
}