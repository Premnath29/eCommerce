export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";

export const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product,
});
export const updateQuantity = (id, amount) => ({
    type: UPDATE_QUANTITY,
    payload: { id, amount },
});
export const removeFromCart = (id) => ({
    type: REMOVE_FROM_CART,
    payload: id,
});
export const clearCart = () => ({
    type: CLEAR_CART,
});
