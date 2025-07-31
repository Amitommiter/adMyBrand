'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

interface ThemeContextType {
  theme: string | undefined
  setTheme: (theme: string) => void
  toggleDarkMode: () => void
  darkMode: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProviderCustom({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string | undefined>('system')
  const [darkMode, setDarkMode] = useState(false)

  const setTheme = (theme: string) => {
    setThemeState(theme)
    localStorage.setItem('theme', theme)
  }

  const toggleDarkMode = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system'
    setThemeState(savedTheme)
  }, [])

  useEffect(() => {
    setDarkMode(theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleDarkMode, darkMode }}>
      <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProviderCustom')
  }
  return context
}