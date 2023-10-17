import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Button,
} from '@mui/material';

const GridCardsProducts = ({ products, handleAddToCart }) => {
  return (
    <Grid container spacing={2}>
      {products.map((data, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card onClick={() => handleAddToCart(data)}>
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                {data['brands'][0]}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                mb={1}
              >
                {data.name}
              </Typography>
              <CardMedia
                height="180"
                alt="Talo Product"
                component="img"
                image={data['imagePath']}
              />
              <Typography variant="h6" component="div">
                $ {data.taloPrice}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  width: '100%',
                  bgcolor: '#374f6d',
                  '&:hover': {
                    bgcolor: '#426187',
                  },
                }}
                variant="contained"
                size="small"
              >
                Agregar al carrito
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GridCardsProducts;
