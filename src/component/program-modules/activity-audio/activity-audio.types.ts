export interface IActivityAudioProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  setContent: (event: string | React.ChangeEvent<HTMLInputElement>) => void
  setHeading: (event: string) => void
  heading: string
  content: string
  handleAudioUpload: (e: any) => void
  audioName: string
  showProgress: boolean
  uploaded: number
  validateFile: (file: any) => string | boolean
  s3key: string
}