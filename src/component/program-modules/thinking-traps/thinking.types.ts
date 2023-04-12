
export interface ISelectOptions {
  id: number
  label: string
  value: string
}

export interface IThinkingTrapsProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setQuestionText: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  heading: string
  questionText: string
  options: any
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
}