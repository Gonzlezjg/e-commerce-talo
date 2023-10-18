import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthTab from '../components/AuthTab';

const Login = () => {
  const isAuthenticated = useSelector(
    (state) => state.user.user.isAuthenticated
  );
  const authError = useSelector((state) => state.user.error);
  const history = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      history('/');
    }
  }, [isAuthenticated, history]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography color="primary" variant="h6" gutterBottom>
        Bienvenido de vuelta
      </Typography>
      <AuthTab />
      {authError && (
        <Typography color="red" variant="h6" gutterBottom>
          {JSON.stringify(authError)}
        </Typography>
      )}
    </Box>
  );
};

export default Login;
