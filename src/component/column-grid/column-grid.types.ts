export interface IColumnGridProps {
  gridData: { title: string }[]
  handleCardClick: (val: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => void
}