import { IListDataProps } from "../../interface";

export interface IListProps {
  patientList: Partial<IListDataProps[]>
  handleClick: (obj: Partial<IListDataProps>) => void
}