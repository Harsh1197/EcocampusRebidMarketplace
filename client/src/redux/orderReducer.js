import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: JSON.parse(localStorage.getItem('orders')) || [],
    },
    reducers: {
        addOrder: (state, action) => {
            const { items, paymentAmount, userId } = action.payload;
            const updatedOrder = { items, paymentAmount, userId };
            state.orders = [...state.orders, updatedOrder];
            localStorage.setItem('orders', JSON.stringify(state.orders));
        },
    },
});



export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
