export interface IAddActivityProps {
  handleChangeSelect: (params: any, actionMeta: any, activityFieldCount: number, dayCount: number) => void
  selectedOptions: any
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  duration: number
  screensData: any[]
  handleAddScreen: any
  handleDeleteScreen: any
  activityFieldCount: number
  setActivityFieldCount: (e:any) => void
  dayCount: number
}