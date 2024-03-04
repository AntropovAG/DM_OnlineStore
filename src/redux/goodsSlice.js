import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGoods = createAsyncThunk(
    "goods/fetchGoods",
    async (page, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/products?page=${page}&limit=20&sort=title%3Aasc`
            );
            if(!response.ok) {
                throw new Error("Ошибка сервера, пожалуйста попробуйте позднее.")
            }

            const data = await response.json();
            dispatch(addPage());
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchGoodByID = createAsyncThunk(
    "goods/fetchGoodByID",
    async (id) => {
        console.log("starting to search for good with id: ", id);
        const response = await fetch(
            `https://skillfactory-task.detmir.team/products/${id}`
        );
        const data = await response.json();
        console.log(data);
        return data;
    }
);

const goodsSlice = createSlice({
    name: "goods",
    initialState: {
        goods: [],
        goodWithId: {},
        goodsPage: 1,
        isLoading: false,
        allGoodsLoaded: false,
        firstLoading: false,
        errorMessage: null
    },
    reducers: {
        addPage: (state) => {
            state.goodsPage += 1;
        },
        setGoodWithID: (state, action) => {
            state.goodWithId = action.payload;
        },
        setFirstLoading: (state, action) => {
            state.firstLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.errorMessage = null;
                state.isLoading = false;
                state.goods = state.goods.concat(action.payload.data);
                if (
                    action.payload.data.length === 0 ||
                    action.payload.data.length < 20
                ) {
                    state.allGoodsLoaded = true;
                }
            })
            .addCase(fetchGoods.pending, (state) => {
                state.errorMessage = null;
                state.isLoading = true;
            })
            .addCase(fetchGoods.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload;
                console.log(state.errorMessage);
            })
            .addCase(fetchGoodByID.pending, (state) => {
                state.goodWithId = {};
            })
            .addCase(fetchGoodByID.fulfilled, (state, action) => {
                state.goodWithId = action.payload;
            });
    },
});

export const { setGoods, addPage, setFirstLoading } = goodsSlice.actions;

export default goodsSlice.reducer;
