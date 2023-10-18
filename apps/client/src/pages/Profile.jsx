import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Paper, Typography } from '@mui/material';
import TableUsers from '../components/TableUsers';
import AddIcon from '@mui/icons-material/Add';
import UserModal from '../components/UserModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { getAllUsers } from '../services/thunks/asyncThunks';

const Profile = () => {
  const { users, loading } = useSelector((state) => state.users);
  const myUser = useSelector((state) => state.user.user);
  const accessToken = useSelector((state) => state.user.user.accessToken);
  const [open, setOpenUserModal] = useState(false);
  const [confirmActionDialog, setConfirmActionDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [idToDeleteOrEdit, setIdToDeleteOrEdit] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(accessToken));
  }, []);

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  function formatReadableDate(isoDate) {
    const date = new Date(isoDate);

    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };

    return date.toLocaleString(undefined, options);
  }

  const transformedData =
    usersData.length > 0 &&
    usersData.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      username: user.username,
      role: user.role,
      createdAt: formatReadableDate(user.createdAt),
    }));

    return (
    <Box
      component={'main'}
      sx={{
        px: 10,
        py: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography fontFamily="Roboto" fontSize={25} variant="p" color="black">
        Hola {myUser.username}
      </Typography>
      <Typography fontFamily="Roboto" fontSize={15} variant="p" color="gray">
        Tipo: {myUser.role}
      </Typography>
      <Box
        sx={{
          textAlign: 'right',
        }}
      >
        <Button
          size="medium"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenUserModal(true)}
        >
          Crear usuario
        </Button>
      </Box>
      {myUser.role === 'ADMIN' && (
        <Paper
          sx={{
            p: 4,
          }}
        >
          {!loading && (
            <TableUsers
              setOpenUserModal={setOpenUserModal}
              users={transformedData}
              setConfirmActionDialog={setConfirmActionDialog}
              setIdToDeleteOrEdit={setIdToDeleteOrEdit}
              loading={loading}
              setIsEditing={setIsEditing}
            />
          )}
        </Paper>
      )}
      {open && (
        <UserModal
          setOpen={setOpenUserModal}
          open={open}
          accessToken={accessToken}
          idToDeleteOrEdit={idToDeleteOrEdit}
          isEditing={isEditing}
        />
      )}
      {confirmActionDialog && (
        <ConfirmDialog
          confirmActionDialog={confirmActionDialog}
          setConfirmActionDialog={setConfirmActionDialog}
          userId={idToDeleteOrEdit}
          accessToken={accessToken}
        />
      )}
    </Box>
  );
};

export default Profile;
