import React, { createContext, useContext, useState, useCallback } from 'react'

interface MarketData {
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
  high24h: number
  low24h: number
}

interface MarketDataContextType {
  marketData: Record<string, MarketData>
  fetchMarketData: (symbol: string) => Promise<void>
  isLoading: boolean
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined)

export function MarketDataProvider({ children }: { children: React.ReactNode }) {
  const [marketData, setMarketData] = useState<Record<string, MarketData>>({})
  const [isLoading, setIsLoading] = useState(false)

  const fetchMarketData = useCallback(async (symbol: string) => {
    setIsLoading(true)
    try {
      // Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData: MarketData = {
        price: 50000 + Math.random() * 10000,
        change: (Math.random() - 0.5) * 2000,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.random() * 1000000000,
        marketCap: Math.random() * 1000000000000,
        high24h: 55000 + Math.random() * 5000,
        low24h: 45000 + Math.random() * 5000,
      }

      setMarketData(prev => ({
        ...prev,
        [symbol]: mockData
      }))
    } catch (error) {
      console.error('Error fetching market data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <MarketDataContext.Provider value={{ marketData, fetchMarketData, isLoading }}>
      {children}
    </MarketDataContext.Provider>
  )
}

export function useMarketData() {
  const context = useContext(MarketDataContext)
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketDataProvider')
  }
  return context
}