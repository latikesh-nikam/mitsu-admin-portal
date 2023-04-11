import { ActionMeta, MultiValue, SingleValue } from "react-select";

export interface ISelectOptions {
  id?: string | number
  label: string
  value?: string | number 
}

export interface ISelectProps {
  dropdownOptions: ISelectOptions[];
  selectedOptions: ISelectOptions[] | ISelectOptions | null;
  onChange: (params: ISelectOptions[] | ISelectOptions) => void;
  name?: string;
  placeholder?: string;
  isMulti?: boolean;
  showDropdownIndicator?: boolean;
  autoScrollToId?: string;
  disabled?: boolean;
  tagLimit?: number;
  isAutoFocus?: boolean;
  isSearchable?: boolean;
  showFullWidth?: boolean;
  showMasterCheck?: boolean;
  handleChangeSelect: (params: any, actionMeta: any, activityFieldCount: number, dayCount: number) => void
  menuPlacement?: any
  hideSelectedOptions?: boolean
  activityFieldCount: number
  dayCount: number
}