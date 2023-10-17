import { Box, Paper } from '@mui/material';
import ResumeStepper from '../../components/ResumeStepper';

const OrderSumary = () => {
  return (
    <Box
      component={'main'}
      sx={{
        padding: 10,
        height: '100vh',
      }}
    >
      <Paper
        sx={{
          p: 4,
        }}
      >
        <ResumeStepper />
      </Paper>
    </Box>
  );
};

export default OrderSumary;
