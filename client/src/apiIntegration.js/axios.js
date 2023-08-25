import axios from 'axios';
export const axiosObject = axios.create({
    headers: {
        authorization:
            `Bearer ${localStorage.getItem('token')}`
    }
})








