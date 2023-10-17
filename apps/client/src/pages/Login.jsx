import { useForm, Controller } from 'react-hook-form';
import { Box, Typography, TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUser } from '../services/thunks/asyncThunks';

import * as yup from 'yup';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  user: yup.string().required('El usuario o email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.user.user.isAuthenticated
  );
  const history = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(authenticateUser(data));
  };

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="user"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Usuario o Email"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.user}
              helperText={errors.user?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Iniciar Sesión
        </Button>
      </form>
    </Box>
  );
};

export default Login;
