import React, { useCallback, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridCellModesModel, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { IDataGridProps, SelectedCellParams } from './dataGrid.types';
import EditToolbar from './toolbar';
import { Button } from "@mui/material";

const Datagrid: React.FC<IDataGridProps> = ({ rowData, isLoading, handleClick }) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true,
    },
    {
      field: 'mobile',
      headerName: 'Phone',
      width: 200,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 100,
      editable: true,
    },
    {
      field: "deleteButton",
      headerName: "Actions",
      description: "Actions column.",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) => handleClick(params.row)}
              variant="contained"
            >
              Delete
            </Button>
          </>
        );
      }
    }
  ];

  const [selectedCellParams, setSelectedCellParams] =
    useState<SelectedCellParams | null>(null);

  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  const handleCellFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      const row = event.currentTarget.parentElement;
      const id = row!.dataset.id!;
      const field = event.currentTarget.dataset.field!;
      setSelectedCellParams({ id, field });
    },
    [],
  );

  const cellMode = useMemo(() => {
    if (!selectedCellParams) {
      return 'view';
    }
    const { id, field } = selectedCellParams;
    return cellModesModel[id]?.[field]?.mode || 'view';
  }, [cellModesModel, selectedCellParams]);

  const handleCellKeyDown = useCallback<GridEventListener<'cellKeyDown'>>(
    (params, event) => {
      if (cellMode === 'edit') {
        event.defaultMuiPrevented = true;
      }
    },
    [cellMode],
  );

  return (
    <div>
      <Box sx={{ width: '100%', m: 1 }}>
        <DataGrid
          rows={rowData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          loading={isLoading}
          autoHeight
          editMode="row"
          onCellKeyDown={handleCellKeyDown}
          cellModesModel={cellModesModel}
          onCellModesModelChange={(model) => setCellModesModel(model)}
          components={{
            Toolbar: EditToolbar,
          }}
          componentsProps={{
            toolbar: {
              cellMode,
              selectedCellParams,
              setSelectedCellParams,
              cellModesModel,
              setCellModesModel,
            },
            cell: {
              onFocus: handleCellFocus,
            },
          }}
          sx={{
            boxShadow: 10,
            border: 1,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            fontSize: 15
          }}
        />
      </Box>
    </div>
  )
}

export default Datagrid