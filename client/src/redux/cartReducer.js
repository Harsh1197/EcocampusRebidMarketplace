import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [], 
    modalData: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        setModalData: (state, action) => {
            state.modalData = action.payload;
        },
        addToCart: (state, action) => {
            state.cartItems.push(action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.productUniqueRef !== action.payload);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeAllItemsFromCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        },
    },
});

export const { addToCart, setModalData, removeFromCart, removeAllItemsFromCart } = cartSlice.actions;
export default cartSlice.reducer;
