import { ReactNode } from "react"

export interface ICanvasProps {
  setVisible: (visible: boolean) => void
  visible: boolean
  gridData?: any
  children: ReactNode
}