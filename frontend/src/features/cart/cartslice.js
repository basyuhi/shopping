import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";
const initialState={
    cart:null,
    loading:false,
    error:null
}
const cartSlice=createSlice({
    name:'cart',
    initialState:initialState,
    reducers:{
        setCart(state,action){
            state.cart=action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.cart = null;
            state.loading = false;
            state.error = null;
        });
    }
})
export const {setCart}=cartSlice.actions;
export default cartSlice.reducer;