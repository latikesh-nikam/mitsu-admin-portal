import { MultiValue, SingleValue } from "react-select";
import { ISelectOptionsProps } from "../../../interface";

export interface IActivityVideoProps {
  handleSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onSubmit?: (formInput: FormData) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  setContent: (event: React.ChangeEvent<HTMLTextAreaElement> | string) => void
  setHeading: (event: React.ChangeEvent<HTMLInputElement> | string) => void
  handleAutoCompleteChange: (newValue: MultiValue<ISelectOptionsProps> | SingleValue<ISelectOptionsProps>) => void
  autocompleteOptions: ISelectOptionsProps

  uploaded: any
  heading: string
  content: string
  showProgress: boolean
  setOpen: (open: boolean) => void;
  activityVideoData?: IActivityVideoData;
}

export interface IActivityVideoData {
  activityVideo: File;
  content: string;
  heading: string;
}