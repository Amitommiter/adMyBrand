'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface LayoutContextType {
  compactLayout: boolean
  setCompactLayout: (compact: boolean) => void
  showAnimations: boolean
  setShowAnimations: (show: boolean) => void
  highContrast: boolean
  setHighContrast: (high: boolean) => void
  reduceMotion: boolean
  setReduceMotion: (reduce: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [compactLayout, setCompactLayout] = useState(false)
  const [showAnimations, setShowAnimations] = useState(true)
  const [highContrast, setHighContrast] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  return (
    <LayoutContext.Provider value={{
      compactLayout,
      setCompactLayout,
      showAnimations,
      setShowAnimations,
      highContrast,
      setHighContrast,
      reduceMotion,
      setReduceMotion
    }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayoutContext() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider')
  }
  return context
} 