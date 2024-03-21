import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { displayLimit } from "../utils/constants";

export const fetchOnPageLoad = createAsyncThunk(
    "orders/fetchOnPageLoad",
    async (_, { rejectWithValue, dispatch }) => {
        dispatch(resetStates())
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/orders?page=1&limit=${displayLimit}`,
                {
                    credentials: "include"
                }
            );
            if (!response.ok) {
                throw new Error("Ошибка сервера, пожалуйста попробуйте позднее.")
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (page, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/orders?page=${page}&limit=${displayLimit}`,
                {
                    credentials: "include"
                }
            );
            if (!response.ok) {
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

const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        isLoading: false,
        error: null,
        ordersPage: 1,
        allGoodsLoaded: false,
        firstLoading: false
    },
    reducers: {
        addPage(state) {
            state.ordersPage += 1;
        },
        resetStates(state) {
            state.ordersPage = 1;
            state.orders = [];
        },
        setFirstLoading: (state, action) => {
            state.firstLoading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOnPageLoad.fulfilled, (state, action) => {
                state.ordersPage = 2;
                state.isLoading = false;
                state.error = null;
                state.orders = state.orders.concat(action.payload.data);
                if (
                    action.payload.data.length === 0 ||
                    action.payload.data.length < displayLimit
                ) {
                    state.allGoodsLoaded = true;
                } else {
                    state.allGoodsLoaded = false;
                }
            })
            .addCase(fetchOnPageLoad.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOnPageLoad.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders = state.orders.concat(action.payload.data);
                if (
                    action.payload.data.length === 0 ||
                    action.payload.data.length < displayLimit
                ) {
                    state.allGoodsLoaded = true;
                }
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { addPage, setFirstLoading, resetStates } = ordersSlice.actions;

export default ordersSlice.reducer;