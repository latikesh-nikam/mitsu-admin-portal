export interface IActivityVideoProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  setContent: (event: string | React.ChangeEvent<HTMLInputElement>) => void
  setHeading: (event: string) => void
  heading: string
  content: string
  handleVideoUpload: (e: any) => void
  videoName: string
  showProgress: boolean
  uploaded: number
  validateFile: (file: any) => string | boolean
  error: string
}