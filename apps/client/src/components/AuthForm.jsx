/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Typography, Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { authenticateUser, createUser } from '../services/thunks/asyncThunks';

import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { app } from '../services/firebase';

const schema = yup.object().shape({
  user: yup.string().required('El usuario o email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const AuthForm = ({ formMode }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (formMode === 'login') {
      dispatch(authenticateUser(data));
      reset();
    } else if (formMode === 'signup') {
      createUserWithEmailAndPassword(auth, data.user, data.password)
        .then((credenciales) => {
          setMessage('¡Usuario creado exitosamente!');
          dispatch(
            createUser({
              email: credenciales.user.email,
              password: data.password,
            })
          );
          reset();
        })
        .catch((error) => {
          const errorMessage = error.message;
          setMessage(errorMessage);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="user"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={formMode === 'login' ? 'Usuario o Email' : 'Email'}
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
      {message && (
        <Typography sx={{ textAlign: 'center' }} color="gray" variant="p">
          {message}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button type="submit" variant="contained" color="primary">
          {formMode === 'login' ? 'Inicia Sesión' : 'Confirmar registro'}
        </Button>
      </Box>
    </form>
  );
};

export default AuthForm;
