import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromLocalStorage(),
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            saveCartToLocalStorage(state.cart);
        },
        updateQuantity: (state, action) => {
            const { id, amount } = action.payload;
            const item = state.cart.find((item) => item.id === id);
        
            if (item) {
                item.quantity = Math.max(1, item.quantity + amount);
            }
            saveCartToLocalStorage(state.cart);
        },
        
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload);
            saveCartToLocalStorage([...state.cart]);
        },
        clearCart: (state) => {
            state.cart = [];
            saveCartToLocalStorage([]);
        },
    },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
