import { IListDataProps } from "../../interface";

export interface IListProps {
  therapistList: Partial<IListDataProps[]>
  handleClick: (obj: Partial<IListDataProps>) => void
}