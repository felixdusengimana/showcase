"use client"
import clsx from "clsx"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
interface ProviderProps{
    children: ReactNode
}
export default function Provider(props:ProviderProps) {
  const {children} = props;
  return (
    <div className={clsx(
        'bg-inherit dark:bg-darkTheme h-full',
        'flex flex-col justify-between',
        'px-2 py-1 md:px-4 md:py-2 lg:px-8 lg:py-4',
        `text-sm`,
      )}>
        <ThemeProvider defaultTheme="dark" enableSystem attribute="class">
            {children}
        </ThemeProvider>
      </div>
  )
}
