import React, { useState } from 'react'
import { Search, Bell, Settings, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  selectedSymbol: string
  onSymbolChange: (symbol: string) => void
}

const popularSymbols = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'SOLUSDT',
  'XRPUSDT', 'DOTUSDT', 'LINKUSDT', 'LTCUSDT', 'BCHUSDT'
]

export default function Header({ selectedSymbol, onSymbolChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const filteredSymbols = popularSymbols.filter(symbol =>
    symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">TradingPro</h1>
              <p className="text-sm text-gray-500">Analisa Chart Professional</p>
            </div>
          </motion.div>

          {/* Search & Symbol Selector */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari symbol..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowDropdown(true)
                  }}
                  onFocus={() => setShowDropdown(true)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                >
                  {filteredSymbols.map((symbol) => (
                    <button
                      key={symbol}
                      onClick={() => {
                        onSymbolChange(symbol)
                        setSearchQuery('')
                        setShowDropdown(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        symbol === selectedSymbol ? 'bg-primary-50 text-primary-600' : ''
                      }`}
                    >
                      {symbol}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Current Symbol Display */}
            <div className="bg-primary-50 px-4 py-2 rounded-lg border border-primary-200">
              <span className="text-primary-700 font-semibold">{selectedSymbol}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}