export interface IAddModuleProps {
  handleForm: (e: any) => void
  children: React.ReactNode
  moduleHeading: string
  moduleDesc: string
  setModuleHeading: (e: any) => void
  setModuleDesc: (e: any) => void
}