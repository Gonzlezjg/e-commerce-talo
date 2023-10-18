/* eslint-disable react/prop-types */
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import GridCardsProducts from '../../components/GridCardsProducts';
import { useGetProductsQuery } from '../../services/products/products';
import CartDrawer from '../../components/CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../services/features/cartSlice';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';

const Store = ({ openDrawer, setOpenDrawer }) => {
  const dispatch = useDispatch();
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products?.hits);
  const cartProducts = useSelector((state) => state.cart.products);
  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <ErrorIcon fontSize="large" color="primary" />
        <Typography fontFamily="Roboto" variant="h2">
          Ha ocurrido un error :(
        </Typography>
      </Box>
    );
  }

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchText(value);
    const filtered = products?.hits.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <>
      <Box
        component={'main'}
        sx={{
          padding: 10,
        }}
      >
        <Box
          component="section"
          sx={{
            display: 'flex',
            flex: '0 1 1',
            width: '100%',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box>
            <TextField
              id="search-products"
              label="Buscador de productos"
              variant="outlined"
              onChange={handleSearchChange}
              value={searchText}
            />
          </Box>
        </Box>

        <Box component={'section'}>
          <GridCardsProducts
            products={filteredProducts}
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
