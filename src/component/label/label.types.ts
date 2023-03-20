type labelType = JSX.IntrinsicElements['label'];

export interface ILabelProps extends labelType {
  htmlfor: string
  name: string
}