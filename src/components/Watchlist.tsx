import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, StarOff, Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { WatchlistItem, CryptoData } from '../types'

interface WatchlistProps {
  onSymbolSelect: (symbol: string) => void
}

export default function Watchlist({ onSymbolSelect }: WatchlistProps) {
  const [watchlist, setWatchlist] = useLocalStorage<WatchlistItem[]>('watchlist', [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSymbol, setNewSymbol] = useState('')

  // Mock data untuk demonstrasi
  const mockPrices: Record<string, CryptoData> = {
    'BTCUSDT': { symbol: 'BTC', name: 'Bitcoin', price: 52450.30, change: 1250.45, changePercent: 2.44, volume: '$28.5B', marketCap: '$1.02T' },
    'ETHUSDT': { symbol: 'ETH', name: 'Ethereum', price: 3245.67, change: -85.23, changePercent: -2.56, volume: '$15.2B', marketCap: '$390.2B' },
    'BNBUSDT': { symbol: 'BNB', name: 'BNB', price: 425.89, change: 12.34, changePercent: 2.98, volume: '$2.1B', marketCap: '$65.4B' },
    'SOLUSDT': { symbol: 'SOL', name: 'Solana', price: 145.23, change: 8.45, changePercent: 6.18, volume: '$3.8B', marketCap: '$64.2B' },
  }

  const addToWatchlist = () => {
    if (!newSymbol.trim()) return
    
    const symbol = newSymbol.toUpperCase()
    if (watchlist.find(item => item.symbol === symbol)) return

    setWatchlist([...watchlist, { symbol, addedAt: Date.now() }])
    setNewSymbol('')
    setShowAddForm(false)
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Watchlist
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSymbol}
                  onChange={(e) => setNewSymbol(e.target.value)}
                  placeholder="Symbol (e.g., BTCUSDT)"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  onKeyDown={(e) => e.key === 'Enter' && addToWatchlist()}
                />
                <button
                  onClick={addToWatchlist}
                  className="px-3 py-2 bg-primary-500 text-white rounded-md text-sm hover:bg-primary-600 transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {watchlist.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <StarOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Your watchlist is empty</p>
            <p className="text-xs mt-1">Add symbols to track your favorite assets</p>
          </div>
        ) : (
          <div className="space-y-2">
            {watchlist.map((item) => {
              const priceData = mockPrices[item.symbol] || {
                symbol: item.symbol,
                name: item.symbol,
                price: Math.random() * 1000,
                change: (Math.random() - 0.5) * 100,
                changePercent: (Math.random() - 0.5) * 10,
                volume: '$0',
                marketCap: '$0'
              }

              return (
                <motion.div
                  key={item.symbol}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors group"
                  onClick={() => onSymbolSelect(item.symbol)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {priceData.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {priceData.symbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          ${priceData.price.toLocaleString()}
                        </span>
                        <span className={`text-xs flex items-center gap-1 ${
                          priceData.changePercent >= 0 
                            ? 'text-success-600 dark:text-success-400' 
                            : 'text-danger-600 dark:text-danger-400'
                        }`}>
                          {priceData.changePercent >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {priceData.changePercent >= 0 ? '+' : ''}{priceData.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFromWatchlist(item.symbol)
                      }}
                      className="p-1 text-gray-400 hover:text-danger-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
