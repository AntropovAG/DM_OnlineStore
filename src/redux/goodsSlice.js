import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGoods = createAsyncThunk("goods/fetchGoods", async (page, {dispatch}) => {
    const response = await fetch(`https://skillfactory-task.detmir.team/products?page=${page}&limit=20&sort=title%3Aasc`);
    const data = await response.json();
    dispatch(addPage());
    return data;
});

const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        goods: [],
        goodsPage: 1,
        isLoading: false,
        allGoodsLoaded: false,
        firstLoading: false
    },
    reducers: {
        addPage: (state) => {
            state.goodsPage += 1;
        },
        setFirstLoading: (state, action) => {
            state.firstLoading = action.payload;
        }
    },
    extraReducers:
        (builder) => {
            builder.addCase(fetchGoods.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goods = state.goods.concat(action.payload.data);
                if(action.payload.data.length === 0 || action.payload.data.length < 20) {
                    state.allGoodsLoaded = true;
                }
            })
            .addCase(fetchGoods.pending, (state) => {
                state.isLoading = true;
            })
        },
})

export const { setGoods, addPage, setFirstLoading } = goodsSlice.actions;

export default goodsSlice.reducer;