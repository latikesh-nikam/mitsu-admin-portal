import { ActionMeta, MultiValue, SingleValue } from "react-select"
import { ISelectOptionsProps } from "../../interface"

export interface IAddScreenProps {
  handleChangeSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>, activityFieldCount: number, dayCount: number, screenIndex: number) => void
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (value: string) => void
  duration: number
  setOpen: (open: boolean) => void,
  handleDeleteScreen: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  index: number
  activityFieldCount: number,
  dayCount: number,
}
