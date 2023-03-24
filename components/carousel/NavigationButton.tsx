import clsx from "clsx";
import { ReactNode } from "react";

interface CarouselButtonProps{
    className?: string,
    text?: string | ReactNode,
    icon?: ReactNode,
}

export default function CarouselButton(props: CarouselButtonProps) {
    const { className, text, icon} = props
  return (
    <div className={clsx(
        'flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md',
        className
    )}>
        {text}{icon}
    </div>
  )
}
