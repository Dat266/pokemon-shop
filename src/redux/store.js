import { configureStore } from "@reduxjs/toolkit";
import cartReduce from "./cartSlice";

export default configureStore({
    reducer: {
        cart: cartReduce,
    },
});
