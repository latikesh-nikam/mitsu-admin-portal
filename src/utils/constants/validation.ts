import { ONLY_ALPHABET_REGEX } from "./regex";

export const validateNameField = (fieldName: string) => (value: string) => {
  if (value?.trim() === "") return `${fieldName} can not be empty`;
};