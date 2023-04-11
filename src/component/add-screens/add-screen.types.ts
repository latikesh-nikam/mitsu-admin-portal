export interface IAddScreenProps {
  handleChangeSelect: (params: any, actionMeta: any, activityFieldCount: number, dayCount: number) => void
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  duration: number
  setOpen: (open: boolean) => void,
  handleDeleteScreen: any,
  activityFieldCount: number,
  dayCount: number,
}