import { BaseSyntheticEvent } from "react";

type ILoginForm = {
  [key: string]: FormDataEntryValue
}

export const getFormData = (event: BaseSyntheticEvent) => {
  const responseBody: ILoginForm = {}
  const formData = new FormData(event.currentTarget as any)
  formData.forEach((value, property: string) => responseBody[property] = value);
  return responseBody
}