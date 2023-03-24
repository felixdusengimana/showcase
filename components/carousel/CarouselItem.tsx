import { ReactNode } from "react"

export interface CarouselItemProps {
  children: ReactNode,
  onClick?: ()=>void,
  onMouseEnter?: ()=>void,
  onMouseLeave?: ()=>void,
}
export default function CarouselItem(props: CarouselItemProps) {
  const {children, onClick, onMouseEnter, onMouseLeave} = props
  return (
    <div
      className="flex-grow flex-shrink-0 flex flex-col justify-center items-center"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
