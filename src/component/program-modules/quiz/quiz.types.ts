import { ActionMeta, MultiValue, SingleValue } from "react-select"

export interface ISelectOptions {
  id: number
  label: string
  value: string
}

export interface IMultipleQuizProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setQuestionText: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  heading: string
  questionText: string
  selectedOptions: ISelectOptions[] | ISelectOptions | null;
  quizOptions: any
  setSelectedOptions: (selectedOptions: any) => void
  // handleChangeSelect: (params: MultiValue<ISelectOptions> | SingleValue<ISelectOptions>, actionMeta: ActionMeta<ISelectOptions>) => void
  handleCorrectAnswerSelect: (params: any, actionMeta: any) => void
  // options: { id: number, label: string, value: string }[]
  options: any
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
  handleQuizTypeSelect: (params: any, actionMeta: any) => void
}