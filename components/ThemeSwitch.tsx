"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { DarkMode, LightMode } from './icons'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <label htmlFor="theme">
      <input
        type="checkbox"
        id="theme"
        name="theme"
        checked={theme === 'light'}
        onChange={e => setTheme(e.target.checked ? 'light' : 'dark')}
        hidden
      />
      
      <div className='h-10 w-10 bg-whiteTheme dark:bg-darkTheme rounded-full shadow-sm flex items-center justify-center'>
          {
            theme === 'light' ? (
              <div className='text-yellow-800'><LightMode/></div>
              ) : (
              <div className='text-yellow-700'><DarkMode/></div>
            )
          }
      </div>
    </label>
  )
}

export default ThemeSwitch