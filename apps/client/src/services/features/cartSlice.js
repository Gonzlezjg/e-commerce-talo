import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
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
        state.products = state.products.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              quantity: product.quantity + 1,
              totalTaloPrice: product.taloPrice + taloPrice,
            };
          }
          return product;
        });
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

    removeProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (existingProductIndex !== -1) {
        if (state.products[existingProductIndex].quantity > 1) {
          state.products = state.products.map((product, index) => {
            if (index === existingProductIndex) {
              return {
                ...product,
                quantity: product.quantity - 1,
              };
            }
            return product;
          });
        } else {
          state.products = state.products.filter(
            (_, index) => index !== existingProductIndex
          );
        }
      }
    },
    editProduct: (state, action) => {
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
        state.products = state.products.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              id,
              name,
              taloPrice,
              taloPriceWithTax,
              brands,
              imagePath,
              stock,
              quantity: product.quantity,
            };
          }
          return product;
        });
      }
    },
  },
});

export const { addProduct, removeProduct, editProduct } = cartSlice.actions;

export default cartSlice.reducer;
