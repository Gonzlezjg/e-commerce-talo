/* eslint-disable react/prop-types */
import { Button, Grid, IconButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  removeProduct,
  removeAll,
} from '../services/features/cartSlice';

export default function CardResume({ data }) {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        maxWidth: 850,
        backgroundColor: '#f5f7fa',
      }}
    >
      <Grid container spacing={1}>
        <Grid alignSelf={'center'} item xs={4}>
          <CardMedia
            component="img"
            sx={{ maxWidth: 300, maxHeight: 60, objectFit: 'fill' }}
            image={data.imagePath}
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item xs={6}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'flex-start',
              }}
            >
              <Typography fontFamily="Roboto" component="div" variant="p">
                {data.brands[0]}
              </Typography>
              <Typography
                fontFamily="Roboto"
                fontWeight="bold"
                component="div"
                variant="p"
              >
                {data.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: 4,
                gap: 1,
              }}
            >
              <Box>
                <Typography fontFamily="Roboto" variant="body2">
                  Precio unitario
                </Typography>
                <Typography
                  fontFamily="Roboto"
                  fontWeight="bold"
                  component="div"
                  variant="body2"
                >
                  $ {data.taloPrice}
                </Typography>
              </Box>
              {data.totalTaloPrice && (
                <Box>
                  <Typography
                    fontFamily="Roboto"
                    component="div"
                    variant="body2"
                  >
                    Precio total
                  </Typography>
                  <Typography
                    fontFamily="Roboto"
                    fontWeight="bold"
                    component="div"
                    variant="body2"
                  >
                    $ {data.totalTaloPrice}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
          item
          px={2}
          xs={2}
        >
          <Tooltip title="Esta acción elimina todos los productos" placement='top-start'>
            <Button
              variant="text"
              color="secondary"
              onClick={() => dispatch(removeAll(data.id))}
            >
              Eliminar
            </Button>
          </Tooltip>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              sx={{
                background: '#374f6d',
                color: 'white',
                '&:hover': {
                  background: '#374f6d',
                  color: 'white',
                },
              }}
              aria-label="remove"
              onClick={(e) => {
                dispatch(removeProduct(data.id));
                e.stopPropagation();
              }}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Box
              sx={{
                py: 1,
                px: 2,
                border: '1px solid black',
                borderRadius: 2,
              }}
            >
              {data.quantity}
            </Box>
            <IconButton
              sx={{
                background: '#374f6d',
                color: 'white',
                '&:hover': {
                  background: '#374f6d',
                  color: 'white',
                },
              }}
              aria-label="add"
              onClick={(e) => {
                dispatch(addProduct(data));
                e.stopPropagation();
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
