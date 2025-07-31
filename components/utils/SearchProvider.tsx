'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (term: string) => void
  isSearching: boolean
  searchResults: SearchResult[]
  highlightText: (text: string) => ReactNode
}

interface SearchResult {
  id: string
  type: 'kpi' | 'chart' | 'table' | 'user' | 'report' | 'setting'
  title: string
  content: string
  path: string
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail
      setSearchTerm(query)
      setIsSearching(true)

      if (query.trim() === '') {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      // Simulate search results based on the query
      const results = performSearch(query)
      setSearchResults(results)
      setIsSearching(false)
    }

    window.addEventListener('dashboard-search', handleSearch as EventListener)
    return () => {
      window.removeEventListener('dashboard-search', handleSearch as EventListener)
    }
  }, [])

  const performSearch = (query: string): SearchResult[] => {
    const lowerQuery = query.toLowerCase()
    const results: SearchResult[] = []

    // Dashboard page content
    if (window.location.pathname === '/') {
      if (lowerQuery.includes('revenue') || lowerQuery.includes('money') || lowerQuery.includes('dollar')) {
        results.push({
          id: 'revenue-kpi',
          type: 'kpi',
          title: 'Revenue KPI',
          content: 'Revenue: $24,500 (+12.3%)',
          path: '/'
        })
      }
      if (lowerQuery.includes('user') || lowerQuery.includes('people')) {
        results.push({
          id: 'users-kpi',
          type: 'kpi',
          title: 'Users KPI',
          content: 'Users: 3,200 (+3.1%)',
          path: '/'
        })
      }
      if (lowerQuery.includes('conversion') || lowerQuery.includes('check')) {
        results.push({
          id: 'conversions-kpi',
          type: 'kpi',
          title: 'Conversions KPI',
          content: 'Conversions: 875 (+7.5%)',
          path: '/'
        })
      }
      if (lowerQuery.includes('growth') || lowerQuery.includes('trend')) {
        results.push({
          id: 'growth-kpi',
          type: 'kpi',
          title: 'Growth KPI',
          content: 'Growth: 18% (+5.4%)',
          path: '/'
        })
      }
      if (lowerQuery.includes('chart') || lowerQuery.includes('graph')) {
        results.push({
          id: 'charts',
          type: 'chart',
          title: 'Analytics Charts',
          content: 'Line Chart, Bar Chart, Pie Chart',
          path: '/'
        })
      }
      if (lowerQuery.includes('table') || lowerQuery.includes('data')) {
        results.push({
          id: 'user-table',
          type: 'table',
          title: 'User Table',
          content: 'Data table with user information',
          path: '/'
        })
      }
    }

    // Reports page content
    if (window.location.pathname === '/reports') {
      if (lowerQuery.includes('campaign') || lowerQuery.includes('total')) {
        results.push({
          id: 'campaigns-report',
          type: 'report',
          title: 'Total Campaigns',
          content: 'Campaign analytics and metrics',
          path: '/reports'
        })
      }
      if (lowerQuery.includes('impression') || lowerQuery.includes('view')) {
        results.push({
          id: 'impressions-report',
          type: 'report',
          title: 'Impressions',
          content: 'View and impression metrics',
          path: '/reports'
        })
      }
      if (lowerQuery.includes('click') || lowerQuery.includes('interaction')) {
        results.push({
          id: 'clicks-report',
          type: 'report',
          title: 'Clicks',
          content: 'Click-through rates and interactions',
          path: '/reports'
        })
      }
      if (lowerQuery.includes('revenue') || lowerQuery.includes('money')) {
        results.push({
          id: 'revenue-report',
          type: 'report',
          title: 'Revenue',
          content: 'Revenue analytics and financial data',
          path: '/reports'
        })
      }
    }

    // Settings page content
    if (window.location.pathname === '/setting') {
      if (lowerQuery.includes('profile') || lowerQuery.includes('user') || lowerQuery.includes('name')) {
        results.push({
          id: 'profile-settings',
          type: 'setting',
          title: 'Profile Settings',
          content: 'Personal information and profile management',
          path: '/setting'
        })
      }
      if (lowerQuery.includes('notification') || lowerQuery.includes('alert')) {
        results.push({
          id: 'notification-settings',
          type: 'setting',
          title: 'Notification Settings',
          content: 'Configure notification preferences',
          path: '/setting'
        })
      }
      if (lowerQuery.includes('preference') || lowerQuery.includes('setting')) {
        results.push({
          id: 'preferences-settings',
          type: 'setting',
          title: 'User Preferences',
          content: 'Customize application settings',
          path: '/setting'
        })
      }
      if (lowerQuery.includes('billing') || lowerQuery.includes('payment') || lowerQuery.includes('subscription')) {
        results.push({
          id: 'billing-settings',
          type: 'setting',
          title: 'Billing & Subscription',
          content: 'Manage subscription and payment methods',
          path: '/setting'
        })
      }
    }

    return results
  }

  const highlightText = (text: string): ReactNode => {
    if (!searchTerm) return text

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    return (
      <>
        {parts.map((part, index) => 
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={index} className="bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    )
  }

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      isSearching,
      searchResults,
      highlightText
    }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 