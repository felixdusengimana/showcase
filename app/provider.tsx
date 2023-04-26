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
        <ThemeProvider enableSystem attribute="class">
            {children}
        </ThemeProvider>
  )
}
