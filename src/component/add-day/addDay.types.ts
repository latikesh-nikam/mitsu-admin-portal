export interface IAddDayProps {
  handleDateChange: (e: any) => void
  selectDate: { id: number, label: string, value: string }[]
  selectWeek?: { id: number, label: string, value: string }[]
  handleChangeSelect: (params: any, actionMeta: any, activityFieldCount: number, dayCount: number) => void
  selectedOptions: any
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | number) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  activityName: string
  setActivityName: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  duration: number
  setSelectedOptions: (e: any) => void
  activitiesArr: any
  setActivitiesArr: (e: any) => void
  activityFieldCount: number
  setActivityFieldCount: (e:any) => void
}