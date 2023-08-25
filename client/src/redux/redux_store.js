import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartReducer';
import { usersSlice } from './Users';

import orderReducer from './orderReducer';
const persistedOrders = JSON.parse(localStorage.getItem('orders')) || [];

const store = configureStore({
    reducer: {
       
        users: usersSlice.reducer,
        cart: cartReducer,
        order: orderReducer,
    },
    preloadedState: {
        order: {
            orders: persistedOrders,
        },
    },
});


store.subscribe(() => {
    const state = store.getState();
    const orders = state.order.orders;
    localStorage.setItem('orders', JSON.stringify(orders));
});

export default store;