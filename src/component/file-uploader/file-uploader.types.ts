export interface IFileUploaderProps {
  name: string
  isMultiple?: boolean
  isRequired?: boolean
  accept: string
  label: string
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}