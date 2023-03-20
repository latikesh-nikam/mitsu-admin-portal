
type inputProps = JSX.IntrinsicElements['input'];

export interface IInputProps extends inputProps {
  name: string
  placeholder?: string
  handleChange?: (e: React.FormEvent<HTMLInputElement>) => void
  handleBlur?: (e: React.FormEvent<HTMLInputElement>) => void
}