import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCart: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.currentCart.push(action.payload);
      state.totalItems += 1;
    },
    increaseQuantity: (state, action) => {
      let newCart = state.currentCart.map((item) => {
        if (item.id === action.payload) {
          item.quantity += 1;
        }
        return item;
      });
      state.currentCart = newCart;
      state.totalItems += 1;
    },
    subtractQuantity: (state, action) => {
      let newCart = state.currentCart.map((item) => {
        if (item.id === action.payload) {
          item.quantity -= 1;
        }
        return item;
      });
      state.currentCart = newCart.filter((item) => item.quantity !== 0);
      state.totalItems -= 1;
    },
    addToTotal: (state, action) => {
      state.totalPrice += action.payload;
    },
    subtractFromTotal: (state, action) => {
      state.totalPrice -= action.payload;
    },
  },
});

export const {
  add,
  increaseQuantity,
  subtractQuantity,
  addToTotal,
  subtractFromTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
