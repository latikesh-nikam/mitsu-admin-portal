export interface ICheckboxListProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setPageHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setContent: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  pageHeading: string
  content: string
  options: Record<string, string>[]
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
}