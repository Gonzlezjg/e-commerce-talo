import { CardActions, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

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
            <Typography component="div" variant="p">
              {data.name}
            </Typography>
            <Typography component="div" variant="body2">
              $ {data.taloPrice} - {data.quantity}
            </Typography>
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
