import { ReactNode } from "react";

export interface IModalProps {
  children: ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  title: string
}