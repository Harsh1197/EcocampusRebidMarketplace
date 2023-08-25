import { axiosObject } from "./axios"



export const GetItem = async (itemFilters) => {
    try {
        const response = await axiosObject.post("/api/catalogue/get-item", itemFilters);
        return response.data
    } catch (error) {
        return error.message;
    }
}



export const DeleteItem = async (id) => {
    try {
        const response = await axiosObject.delete(`/api/catalogue/delete-item/${id}`);
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const UpdateItem = async (id, data) => {
    try {
        const response = await axiosObject.put(`/api/catalogue/update-item/${id}`, data);
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const UpdateStatus = async (id, productStatus) => {
    try {
        const response = await axiosObject.put(`/api/catalogue/update-item-status/${id}`, { productStatus });
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const GetItemById = async (id) => {
    try {
        const response = await axiosObject.get(`/api/catalogue/get-item-by-id/${id}`);
        return response.data
    } catch (error) {
        return error.message;
    }
}



export const AddItem = async (data) => {
    try {
        const response = await axiosObject.post("/api/catalogue/add-item", data);
        return response.data
    } catch (error) {
        return error.message;
    }
}

export const uploadImage = async (data) => {
    try {
        const response = await axiosObject.post("/api/catalogue/upload-product-image", data);
        return response.data
    } catch (error) {

        return error.message;
    }
}
export const createBid = async (payload) => {
    try {
        const response = await axiosObject.post('/api/bids/create-bid', payload);
        return response.data;
    }
    catch (error) {
        return error.message
    }
}

export const getBids = async (filters) => {
    try {

        const response = await axiosObject.post('/api/bids/get-products-bid', filters);

        return response.data;

    }
    catch (error) {
        return error.message
    }
}

