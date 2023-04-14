export interface ICardProps {
  title: string
  subtitle: string
  handleCardClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}