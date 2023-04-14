import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { ISelectOptionsProps } from "../../interface";

export interface ISelectProps {
  dropdownOptions: ISelectOptionsProps[];
  selectedOptions: ISelectOptionsProps | ISelectOptionsProps[];
  onChange: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number) => void;
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

  handleChangeSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number) => void

  menuPlacement: 'top' | 'bottom' | 'auto'
  hideSelectedOptions?: boolean
  activityFieldCount: number
  dayCount: number
}