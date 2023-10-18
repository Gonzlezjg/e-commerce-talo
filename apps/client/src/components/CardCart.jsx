/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NumbersIcon from '@mui/icons-material/Numbers';

export default function CardCart({ data }) {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        maxWidth: 300,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography
              fontWeight="bold"
              fontFamily="Roboto"
              component="div"
              variant="p"
            >
              {data.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 2,
              }}
            >
              <Typography fontFamily="Roboto" component="div" variant="body2">
                $ {data.taloPrice} -
              </Typography>
              <Typography
                fontFamily="Roboto"
                component="div"
                variant="body2"
                sx={{
                  display: 'flex',
                  py: 0.5,
                  px: 1,
                  border: '1px solid gray',
                  borderRadius: 2,
                }}
              >
                {data.quantity}
              </Typography>
            </Box>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ maxWidth: 90, maxHeight: 90 }}
          image={data.imagePath}
          alt="Live from space album cover"
        />
      </Box>
    </Card>
  );
}
