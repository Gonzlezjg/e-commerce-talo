/* eslint-disable react/prop-types */
import { Box, Button, Skeleton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function TableUsers({
  users,
  setConfirmActionDialog,
  setIdToDeleteOrEdit,
  loading,
  setOpenUserModal,
  setIsEditing,
}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstname', headerName: 'Nombre', width: 130 },
    { field: 'username', headerName: 'Nombre de usuario', width: 200 },
    {
      field: 'role',
      headerName: 'Rol',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Fecha de creación',
      width: 200,
    },
    {
      field: '',
      headerName: 'Acciones',
      sortable: false,
      width: 500,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Button
              size="medium"
              variant="contained"
              startIcon={<DeleteOutlinedIcon />}
              onClick={(e) => {
                setIsEditing(true);
                setIdToDeleteOrEdit(params.row.id);
                setOpenUserModal(true);
                e.stopPropagation();
              }}
            >
              Editar usuario
            </Button>
            <Button
              size="medium"
              variant="contained"
              sx={{
                background: 'red',
                color: 'white',
                '&:hover': { background: 'red' },
              }}
              startIcon={<DeleteOutlinedIcon />}
              onClick={(e) => {
                setConfirmActionDialog(true);
                setIdToDeleteOrEdit(params.row.id);
                e.stopPropagation();
              }}
            >
              Eliminar usuario
            </Button>
          </Box>
        );
      },
    },
  ];

  if (loading) {
    return <Skeleton variant="rectangular" width={'100%'} height={300} />;
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
