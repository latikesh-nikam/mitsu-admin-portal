import {
  GridCellModesModel, GridRowId,
} from '@mui/x-data-grid';

interface SelectedCellParams {
  id: GridRowId;
  field: string;
}

export interface EditToolbarProps {
  selectedCellParams?: SelectedCellParams;
  cellModesModel: GridCellModesModel;
  setCellModesModel: (value: GridCellModesModel) => void;
  cellMode: 'view' | 'edit';
}