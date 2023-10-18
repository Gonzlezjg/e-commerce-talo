/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../services/thunks/asyncThunks';
import { removeUserFromState } from '../services/features/userSlice';

export default function ConfirmDialog({
  title = '¿Desea realizar esta acción?',
  setConfirmActionDialog,
  confirmActionDialog,
  userId,
  accessToken,
}) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setConfirmActionDialog(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser({ userId, accessToken }));
    dispatch(removeUserFromState(userId));
    handleClose();
  };

  return (
    <Dialog open={confirmActionDialog} onClose={handleClose}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {title}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete}>Aceptar</Button>
        <Button onClick={handleClose} autoFocus>
          rechazar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
