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
            console.log("Данные о корзине обновлены! Вызов!", data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const cartSclice = createSlice({
    name: "cart",
    initialState: {
        cartContent: {
            "data": [],
        },
        cartData: {
            "data": [],
        }
    },
    reducers: {
        updateCartData(state, action) {
            const {id, count} = action.payload;
            const indexWithId = state.cartData.data.findIndex((item) => item.id === id);
            console.log(indexWithId)
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
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCart.fulfilled, (state, action) => {
            state.cartContent.data = action.payload;
            state.cartData.data = action.payload.map((item)=>({"id": item.product.id, "quantity": item.quantity}))
        })
        .addCase(updateCart.fulfilled, (state, action) => {
            state.cartContent.data = action.payload;
        });
    
    }
});

export const { updateCartData, setisInitialLoad, deleteItem } = cartSclice.actions;
export default cartSclice.reducer;