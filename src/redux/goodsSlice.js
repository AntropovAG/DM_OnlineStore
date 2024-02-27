import { createSlice } from "@reduxjs/toolkit";

const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        goods: [
            {
                name: "apple",
                price: 1,
            },
            {
                name: "banana",
                price: 2,
            },
            {
                name: "cherry",
                price: 3,
            },
        ],
    },
    reducers: {
        setGoods: (state, action) => {
            state.goods = action.payload;
        },
    },
})

export const { setGoods } = goodsSlice.actions;

export default goodsSlice.reducer;