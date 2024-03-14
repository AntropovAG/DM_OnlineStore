import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (page, { rejectWithValue, dispatch }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/orders?page=${page}&limit=5`
            );
            if(!response.ok) {
                throw new Error("Ошибка сервера, пожалуйста попробуйте позднее.")
            }

            const data = await response.json();
            console.log(data)
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
    },
    reducers: {
        addPage(state) {
            state.ordersPage += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.orders = state.orders.concat(action.payload.data);
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    }
});

export const { addPage } = ordersSlice.actions;

export default ordersSlice.reducer;