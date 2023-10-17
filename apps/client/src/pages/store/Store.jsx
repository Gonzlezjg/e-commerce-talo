import { Box, Typography } from '@mui/material';
import GridCardsProducts from '../../components/GridCardsProducts';
import { useGetProductsQuery } from '../../services/products/products';
import CartDrawer from '../../components/CartDrawer';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../services/features/cartSlice';

const Store = ({ openDrawer, setOpenDrawer }) => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();

  const cartProducts = useSelector((state) => state.cart.products);
  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  if (isLoading) {
    return <>Loading..</>;
  }

  if (error) {
    return <>Error..</>;
  }

  return (
    <>
      <Box
        component={'main'}
        sx={{
          padding: 10,
        }}
      >
        <Typography variant="h6" color={'#131921'} mb={4}>
          En Talo Shop puedes encontrar todos los materiales de construcción
        </Typography>
        <Box component={'section'}>
          <GridCardsProducts
            products={products.hits}
            handleAddToCart={handleAddToCart}
          />
        </Box>
      </Box>

      {openDrawer && (
        <CartDrawer
          cartProducts={cartProducts}
          setOpenDrawer={setOpenDrawer}
          openDrawer={openDrawer}
        />
      )}
    </>
  );
};

export default Store;
