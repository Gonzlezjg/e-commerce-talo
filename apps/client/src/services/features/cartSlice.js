import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct(state, action) {
      const {
        id,
        name,
        taloPrice,
        taloPriceWithTax,
        brands,
        imagePath,
        stock,
      } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1;
      } else {
        state.products.push({
          id,
          name,
          taloPrice,
          taloPriceWithTax,
          brands,
          imagePath,
          stock,
          quantity: 1,
        });
      }
    },
    removeProduct(state, action) {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (existingProductIndex !== -1) {
        if (state.products[existingProductIndex].quantity > 1) {
          state.products[existingProductIndex].quantity -= 1;
        } else {
          state.products.splice(existingProductIndex, 1);
        }
      }
    },
    editProduct(state, action) {
      const {
        id,
        name,
        taloPrice,
        taloPriceWithTax,
        brands,
        imagePath,
        stock,
      } = action.payload;
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === id
      );

      if (existingProductIndex !== -1) {
        state.products[existingProductIndex] = {
          id,
          name,
          taloPrice,
          taloPriceWithTax,
          brands,
          imagePath,
          stock,
          quantity: state.products[existingProductIndex].quantity,
        };
      }
    },
  },
});

export const { addProduct, removeProduct, editProduct } = cartSlice.actions;

export default cartSlice.reducer;