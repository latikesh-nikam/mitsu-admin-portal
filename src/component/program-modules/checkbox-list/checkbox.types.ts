export interface ICheckboxListProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setPageHeading: (event: string) => void
  setContent: (event: string) => void
  pageHeading: string
  content: string
  options: any
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
  handleDynamicValidation: (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => void
  dynamicError: any
}