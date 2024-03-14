import { configureStore } from "@reduxjs/toolkit";
import goodsReducer from "./goodsSlice";
import cartReducer from "./cartSlice";
import ordersReducer from "./ordersSlice";

export default configureStore({
    reducer: {
        goods: goodsReducer,
        cart: cartReducer,
        orders: ordersReducer,
    }
})