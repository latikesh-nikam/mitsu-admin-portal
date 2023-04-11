export interface ITextIntroProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  setPageHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setContentHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  setContentIntro: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  pageHeading: string
  contentHeading: string
  contentIntro: string
  setOpen: (open: boolean) => void
}