import { ReactNode } from "react"

export interface ICanvasProps {
  setVisible: (visible: boolean) => void
  visible: boolean
  gridData?: Grid[]
  children: ReactNode
}

interface Grid {
  id: number | string
  title: string
}