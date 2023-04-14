import { ActionMeta, MultiValue, SingleValue } from "react-select"
import { ISelectOptionsProps } from "../../../interface";

export interface IMultipleQuizProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setQuestionText: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  selectedOptions: ISelectOptionsProps[] | ISelectOptionsProps;
  quizOptions: ISelectOptionsProps
  setSelectedOptions: (selectedOptions: ISelectOptionsProps[] | ISelectOptionsProps) => void
  handleCorrectAnswerSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>) => void
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
  handleQuizTypeSelect: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>, actionMeta: ActionMeta<ISelectOptionsProps>) => void
  questionText: string
  heading: string
  options: any
}