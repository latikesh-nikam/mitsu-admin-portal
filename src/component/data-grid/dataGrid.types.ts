import {
  GridRowId,
} from '@mui/x-data-grid';
import { IListDataProps } from '../../interface';

export interface IDataGridProps {
  rowData: Partial<IListDataProps[]>
  isLoading?: boolean
  handleClick: (obj: Partial<IListDataProps>) => void
}

export interface SelectedCellParams {
  id: GridRowId;
  field: string;
}