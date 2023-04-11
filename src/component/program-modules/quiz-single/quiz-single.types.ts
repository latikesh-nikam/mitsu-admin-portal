import { ActionMeta, MultiValue, SingleValue } from "react-select"

export interface ISelectOptions {
  id: string | number
  label: string
  value: string
}

export interface IQuizSingleChoiceProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  headingQS: string
  setHeadingQS: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  questionText: string
  setQuestionText: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  option1: string
  setOption1: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  option2: string
  setOption2: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  option3: string
  setOption3: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  option4: string
  setOption4: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  correctAnswerOption: string
  setCorrectAnswerOption: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  textExplanation: string
  setTextExplanation: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  handleChangeSelect: (params: any, actionMeta: any) => void
  selectedOptions: ISelectOptions[] | ISelectOptions | null;
  setOpen: (open: boolean) => void
  setDuration: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  duration: string
}