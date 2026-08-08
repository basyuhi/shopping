import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import cartReducer from '../features/cart/cartslice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
    }
})
export default store