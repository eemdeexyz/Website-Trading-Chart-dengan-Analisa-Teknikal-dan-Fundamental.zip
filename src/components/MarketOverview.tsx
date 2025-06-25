import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Globe,
  Activity,
  Zap,
  Shield
} from 'lucide-react'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
}

export default function MarketOverview() {
  const topCryptos: MarketData[] = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 52450.30,
      change: 1250.45,
      changePercent: 2.44,
      volume: '$28.5B',
      marketCap: '$1.02T'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3245.67,
      change: -85.23,
      changePercent: -2.56,
      volume: '$15.2B',
      marketCap: '$390.2B'
    },
    {
      symbol: 'BNB',
      name: 'BNB',
      price: 425.89,
      change: 12.34,
      changePercent: 2.98,
      volume: '$2.1B',
      marketCap: '$65.4B'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 145.23,
      change: 8.45,
      changePercent: 6.18,
      volume: '$3.8B',
      marketCap: '$64.2B'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.5234,
      change: -0.0123,
      changePercent: -2.30,
      volume: '$890M',
      marketCap: '$18.5B'
    }
  ]

  const marketStats = [
    {
      label: 'Total Market Cap',
      value: '$2.45T',
      change: 2.1,
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      label: '24h Volume',
      value: '$89.2B',
      change: -1.5,
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      label: 'BTC Dominance',
      value: '51.2%',
      change: 0.8,
      icon: Shield,
      color: 'text-orange-600'
    },
    {
      label: 'Active Coins',
      value: '2,847',
      change: 0.0,
      icon: Globe,
      color: 'text-green-600'
    }
  ]

  const marketSentiment = {
    fearGreed: 72,
    sentiment: 'Greed',
    description: 'Pasar menunjukkan sentimen greed yang kuat'
  }

  return (
    <div className="space-y-6">
      {/* Market Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {marketStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`text-sm px-2 py-1 rounded ${
                stat.change >= 0 ? 'text-success-600 bg-success-50' : 'text-danger-600 bg-danger-50'
              }`}>
                {stat.change >= 0 ? '+' : ''}{stat.change}%
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Market Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary-500" />
          Sentimen Pasar Global
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeDasharray={`${marketSentiment.fearGreed}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{marketSentiment.fearGreed}</div>
                  <div className="text-xs text-gray-500">Fear & Greed</div>
                </div>
              </div>
            </div>
            <div className="text-lg font-semibold text-success-600">{marketSentiment.sentiment}</div>
            <div className="text-sm text-gray-500 mt-1">{marketSentiment.description}</div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-blue-900">Volatilitas</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">Medium</div>
              <div className="text-sm text-blue-700">VIX Crypto: 45.2</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-purple-900">Global Trend</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">Bullish</div>
              <div className="text-sm text-purple-700">Trend 7 hari: +12.5%</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Top Movers</h4>
            {[
              { name: 'SOL', change: 15.2 },
              { name: 'AVAX', change: 12.8 },
              { name: 'MATIC', change: -8.5 }
            ].map((mover, index) => (
              <div key={mover.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="font-medium text-gray-900">{mover.name}</span>
                <span className={`text-sm font-medium ${
                  mover.change >= 0 ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {mover.change >= 0 ? '+' : ''}{mover.change}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Top Cryptocurrencies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            Top Cryptocurrency
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cryptocurrency
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  24h Change
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topCryptos.map((crypto, index) => (
                <motion.tr
                  key={crypto.symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        {crypto.symbol.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                        <div className="text-sm text-gray-500">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${crypto.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end gap-1 text-sm font-medium ${
                      crypto.change >= 0 ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {crypto.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{crypto.changePercent >= 0 ? '+' : ''}{crypto.changePercent}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {crypto.volume}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {crypto.marketCap}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}