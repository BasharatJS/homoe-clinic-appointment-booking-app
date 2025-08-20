'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export default function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true)
    
    // Minimum loading time for better UX
    const minLoadingTime = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Also wait for DOM to be fully loaded
    if (document.readyState === 'complete') {
      setTimeout(() => setIsLoading(false), 2000)
    } else {
      const handleLoad = () => {
        setTimeout(() => setIsLoading(false), 2000)
      }
      window.addEventListener('load', handleLoad)
      return () => {
        clearTimeout(minLoadingTime)
        window.removeEventListener('load', handleLoad)
      }
    }

    return () => clearTimeout(minLoadingTime)
  }, [])

  // Don't render anything on server side to prevent hydration mismatch
  if (!isClient) {
    return null
  }

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingSpinner />}
      <div
        className={`transition-opacity duration-500 ${
          isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {children}
      </div>
    </LoadingContext.Provider>
  )
}