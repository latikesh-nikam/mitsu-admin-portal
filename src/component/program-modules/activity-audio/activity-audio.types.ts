export interface IActivityAudioProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setContent: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  uploaded: any
  heading: string
  content: string
  showProgress: boolean
  setOpen: (open: boolean) => void
}