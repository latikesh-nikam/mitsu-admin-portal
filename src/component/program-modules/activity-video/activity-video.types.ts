export interface IActivityVideoProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setContent: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  heading: string
  content: string
  setOpen: (open: boolean) => void
}