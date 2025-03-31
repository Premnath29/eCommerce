import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/Reducer/cartReducer.js"; 

const store = configureStore({
    reducer: {
        cart: cartReducer, 
    },
});

export default store;
