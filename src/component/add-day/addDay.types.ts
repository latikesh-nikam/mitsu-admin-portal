import { ActionMeta, MultiValue, SingleValue } from "react-select";
import { IOptionProps, ISelectOptionsProps } from "../../interface";
export interface IAddDayProps {
  handleDateChange: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>) => void
  selectDate: { id: number, label: string, value: string }[]
  selectWeek?: { id: number, label: string, value: string }[]
  selectedOptions: IOptionProps[]
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (value: string) => void
  handleChangeSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number, screenIndex: number) => void

  duration: number
  setSelectedOptions: (e: any) => void
  activitiesArr: any
  setActivitiesArr: (e: any) => void
  activityFieldCount: number
  setActivityFieldCount: (e: any) => void

  errorName: string
  setErrorName: (val: string) => void
  errorDuration: string
  setErrorDuration: (val: string) => void
}