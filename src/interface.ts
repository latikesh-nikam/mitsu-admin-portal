export interface IListDataProps {
  id: string
  name: string
  email: string
  password: string
  role: string
  mobile: string
  mPin: string
  isMobileVerified: boolean
  isEmailVerified: boolean
  isMPinVerified: boolean
  address: string
  dateOfBirth: string
  gender: string
  education: string
  relationshipStatus: string
  occupation: string
  introduction: string
  picture: string
}
export interface IModuleProps {
  name?: string
  description?: string
  week?: number | string
  image_link?: string
  activities?: Partial<IActivitiesProps[]>
}
export interface IActivitiesProps {
  identifier?: string | number
  name?: string
  durationMin?: string | number
  screens?: Partial<IScreensProps[]>
}
export interface IScreensProps {
  name: string,
  type: string,
  content_heading: string,
  content_text?: string
}
export interface ISelectOptionsProps {
  id: string | number
  label: string
  value: string | number
}
export interface IOptionProps {
  id: number,
  label: string,
  value: string,
  activities: IActivityProps[]
}
export interface IActivityProps {
  identifier: number,
  activityName: string,
  durationMin: number,
  screens?: never[]
}