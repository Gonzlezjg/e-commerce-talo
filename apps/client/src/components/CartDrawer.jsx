import Drawer from '@mui/material/Drawer';
import CardCart from './CardCart';
import { Box, Button, Typography } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Link } from 'react-router-dom';
export default function CartDrawer({
  setOpenDrawer,
  openDrawer,
  cartProducts,
}) {
  return (
    <Drawer
      anchor={'right'}
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 250,
          px: 2,
          py: 5,
        }}
      >
        <Typography fontFamily="Roboto" fontWeight={700} variant="p">
          Resumen de tu carrito
        </Typography>
      </Box>
      <Box
        sx={{
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {cartProducts.map((data, index) => (
          <CardCart key={index} data={data} />
        ))}
      </Box>

      {cartProducts.length > 0 && (
        <Link to="/billing/resume">
          <Button
            sx={{
              bgcolor: '#374f6d',
              '&:hover': {
                bgcolor: '#426187',
              },
              mx: 2,
              mt: 2,
            }}
            variant="contained"
            startIcon={<PaymentIcon />}
          >
            Ir al detalle
          </Button>
        </Link>
      )}
    </Drawer>
  );
}
