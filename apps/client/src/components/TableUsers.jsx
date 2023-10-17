import { Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function TableUsers({
  users,
  setConfirmActionDialog,
  setIdToDelete,
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
              gap: 1
            }}
          >
            <Button
              size="medium"
              variant="contained"
              startIcon={<DeleteOutlinedIcon />}
              onClick={(e) => {
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
                setIdToDelete(params.row.id);
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
