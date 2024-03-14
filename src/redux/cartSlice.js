import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/cart`
            );
            if (!response.ok) {
                throw new Error("Не удалось получить данные о корзине.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/cart/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartData),
                }
            );
            if (!response.ok) {
                throw new Error("Не удалось обновить данные о корзине.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const setOneItemInCart = createAsyncThunk(
    "cart/setOneItemInCart",
    async (cartData, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/cart/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(cartData),
                }
            );
            if (!response.ok) {
                throw new Error("Не удалось обновить данные о корзине.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    })

export const submitCart = createAsyncThunk(
    "cart/submitCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/cart/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Не удалось оформить заказ.");
            }
            const data = await response.json();
            console.log("Данные при сабмите: ", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const submitOneItem = createAsyncThunk(
    "cart/submitOneItem",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://skillfactory-task.detmir.team/cart/submit`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Не удалось оформить заказ.");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


const cartSclice = createSlice({
    name: "cart",
    initialState: {
        cartContent: {
            "data": [],
        },
        cartData: {
            "data": [],
        },
        isLoading: false,
        isSubmitting: false,
        popupIsOpen: false,
        initialLoad: true,
    },
    reducers: {
        updateCartData(state, action) {
            const {id, count} = action.payload;
            const indexWithId = state.cartData.data.findIndex((item) => item.id === id);
            if(indexWithId !== -1) {
                state.cartData.data[indexWithId].quantity = count;
            } else {
                state.cartData.data.push({id, quantity: count});
            }
        },
        deleteItem(state, action) {
            const {id} = action.payload;
            const indexWithId = state.cartData.data.findIndex((item) => item.id === id);
            state.cartData.data.splice(indexWithId, 1);
        },
        addItem(state, action) {
            const {id, count} = action.payload;
            state.cartData.data.push({id, quantity: count});
        },
        setCartData(state, action) {
            state.cartData = action.payload;
        },
        togglePopup(state) {
            state.popupIsOpen = !state.popupIsOpen;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            const formattedData = action.payload.map((item)=>({"id": item.product.id, "quantity": item.quantity}));
            state.cartContent.data = action.payload;
            state.cartData.data = formattedData;
            state.initialLoad = false;
        })
        .addCase(updateCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateCart.rejected, (state) => {
            state.isLoading = false;
        })        
        .addCase(updateCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartContent.data = action.payload;
        })
        .addCase(setOneItemInCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setOneItemInCart.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(setOneItemInCart.fulfilled, (state) => {
            state.isLoading = false;
        })
        .addCase(submitCart.pending, (state) => {
            state.isSubmitting = true;
        })
        .addCase(submitCart.rejected, (state) => {
            state.isSubmitting = false;
        })
        .addCase(submitCart.fulfilled, (state) => {
            state.isSubmitting = false;
            state.popupIsOpen = true;
            state.cartData.data = [];
        })
        .addCase(submitOneItem.pending, (state) => {
            state.isSubmitting = true;
        })
        .addCase(submitOneItem.rejected, (state) => {
            state.isSubmitting = false;
        })
        .addCase(submitOneItem.fulfilled, (state) => {
            state.isSubmitting = false;
            state.popupIsOpen = true;
        })
    }
});

export const { updateCartData, setisInitialLoad, deleteItem, setCartData, togglePopup } = cartSclice.actions;
export default cartSclice.reducer;