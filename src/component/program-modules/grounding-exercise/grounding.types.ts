export interface IGroundingExerciseProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setQuestionText: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  heading: string
  questionText: string
  options: any
  setOptions: (options: any) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
  setOpen: (open: boolean) => void
  handleChangeSelect: (params: any, actionMeta: any, activityFieldCount: number, dayCount: number, index: number) => void
  selectedOptions: any
  handleDynamicValidation: (event: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => void
  dynamicError: any
  // dynamicSelectError: any
}