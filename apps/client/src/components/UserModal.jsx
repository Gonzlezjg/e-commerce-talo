/* eslint-disable react/prop-types */
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
} from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../services/thunks/asyncThunks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function UserModal({
  open = false,
  setOpen,
  accessToken,
  isEditing,
  idToDeleteOrEdit,
}) {
  const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es requerido'),
    password: !isEditing
      ? yup.string().required('La contraseña es requerida')
      : yup.string().optional(),
    email: yup
      .string()
      .email('Ingrese un correo válido')
      .required('El correo es requerido'),
    role: yup.string().required('El rol es requerido'),
    firstname: yup.string().required('El primer nombre es requerido'),
    isActive: yup.boolean().required('El estado de actividad es requerido'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { users, feedback } = useSelector((state) => state.users);
  const userToEdit = users.filter((data) => data.id === idToDeleteOrEdit);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    const { username, password, email, role, firstname, isActive } = data;
    if (isEditing) {
      dispatch(
        updateUser({
          userId: idToDeleteOrEdit,
          username,
          password,
          email,
          role,
          firstname,
          isActive,
          accessToken,
        })
      );
    } else {
      dispatch(
        createUser({
          username,
          password,
          email,
          role,
          firstname,
          isActive,
          accessToken,
        })
      );
    }

    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" gutterBottom>
          {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue={isEditing ? userToEdit[0].username : ''}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.username}
                helperText={errors.username?.message}
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
          <Controller
            name="email"
            control={control}
            defaultValue={isEditing ? userToEdit[0].email : ''}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            defaultValue={isEditing ? userToEdit[0].role : 'CLIENT'}
            render={({ field }) => (
              <Select
                {...field}
                label="Rol"
                variant="outlined"
                fullWidth
                margin="normal"
                sx={{ color: 'black' }}
              >
                <MenuItem value="ADMIN">Administrador</MenuItem>
                <MenuItem value="CLIENT">Cliente</MenuItem>
              </Select>
            )}
          />
          <Controller
            name="firstname"
            control={control}
            defaultValue={isEditing ? userToEdit[0].firstname : ''}
            render={({ field }) => (
              <TextField
                {...field}
                label="Primer Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.firstname}
                helperText={errors.firstname?.message}
              />
            )}
          />
          <Controller
            name="isActive"
            control={control}
            defaultValue={isEditing ? userToEdit[0].isActive : false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch {...field} color="primary" checked={field.value} />
                }
                label="¿Está activo?"
              />
            )}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {feedback && (
              <Typography textAlign="center" color="red" variant="p">
                {feedback.message}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Actualizar' : 'Guardar'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
