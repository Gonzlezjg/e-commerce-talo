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

      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalTaloPrice += taloPrice;
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
          totalTaloPrice: taloPrice,
        });
      }
    },
    removeProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      if (existingProductIndex !== -1) {
        const existingProduct = state.products[existingProductIndex];

        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
          existingProduct.totalTaloPrice -= existingProduct.taloPrice;
        } else {
          state.products.splice(existingProductIndex, 1);
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
    removeAll(state, action) {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload
      );

      state.products.splice(existingProductIndex, 1);
    },
  },
});

export const { addProduct, removeProduct, editProduct, removeAll } =
  cartSlice.actions;

export default cartSlice.reducer;
