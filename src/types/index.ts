export interface CryptoData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  high24h?: number
  low24h?: number
  image?: string
}

export interface TechnicalIndicator {
  name: string
  value: number | string
  signal: 'buy' | 'sell' | 'neutral'
  description: string
  strength?: number
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  impact: 'positive' | 'negative' | 'neutral'
  timestamp: string
  source?: string
  url?: string
}

export interface PriceAlert {
  id: string
  symbol: string
  targetPrice: number
  condition: 'above' | 'below'
  isActive: boolean
  createdAt: number
}

export interface WatchlistItem {
  symbol: string
  addedAt: number
}

export interface PortfolioItem {
  symbol: string
  amount: number
  averagePrice: number
  addedAt: number
}

export type TimeFrame = '1m' | '5m' | '15m' | '1h' | '4h' | '1d' | '1w' | '1M'
