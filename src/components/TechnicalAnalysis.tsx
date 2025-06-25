import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Target, BarChart3 } from 'lucide-react'
import { useMarketData } from '../contexts/MarketDataContext'

interface TechnicalAnalysisProps {
  symbol: string
}

interface Indicator {
  name: string
  value: number
  signal: 'buy' | 'sell' | 'neutral'
  description: string
}

export default function TechnicalAnalysis({ symbol }: TechnicalAnalysisProps) {
  const { marketData } = useMarketData()

  // Generate technical indicators (in real app, this would come from API)
  const indicators: Indicator[] = [
    {
      name: 'RSI (14)',
      value: 45.2,
      signal: 'neutral',
      description: 'Relative Strength Index menunjukkan kondisi netral'
    },
    {
      name: 'MACD',
      value: 1.23,
      signal: 'buy',
      description: 'MACD line di atas signal line, momentum bullish'
    },
    {
      name: 'Bollinger Bands',
      value: 0.85,
      signal: 'buy',
      description: 'Harga mendekati lower band, potensi rebound'
    },
    {
      name: 'Stochastic',
      value: 25.8,
      signal: 'buy',
      description: 'Stochastic oversold, sinyal beli potensial'
    },
    {
      name: 'Williams %R',
      value: -78.5,
      signal: 'buy',
      description: 'Williams %R oversold, momentum pembalikan'
    },
    {
      name: 'Moving Average (20)',
      value: 52450.30,
      signal: 'sell',
      description: 'Harga di bawah MA20, trend bearish jangka pendek'
    }
  ]

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'buy':
        return <TrendingUp className="w-4 h-4" />
      case 'sell':
        return <TrendingDown className="w-4 h-4" />
      default:
        return <Minus className="w-4 h-4" />
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'buy':
        return 'indicator-positive'
      case 'sell':
        return 'indicator-negative'
      default:
        return 'indicator-neutral'
    }
  }

  const buySignals = indicators.filter(i => i.signal === 'buy').length
  const sellSignals = indicators.filter(i => i.signal === 'sell').length
  const neutralSignals = indicators.filter(i => i.signal === 'neutral').length

  const overallSignal = buySignals > sellSignals ? 'buy' : sellSignals > buySignals ? 'sell' : 'neutral'

  return (
    <div className="space-y-6">
      {/* Overall Analysis Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            Analisa Teknikal {symbol}
          </h2>
          <div className={`px-4 py-2 rounded-full border text-sm font-medium flex items-center gap-2 ${getSignalColor(overallSignal)}`}>
            {getSignalIcon(overallSignal)}
            <span className="capitalize">
              {overallSignal === 'buy' ? 'Bullish' : overallSignal === 'sell' ? 'Bearish' : 'Netral'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="text-2xl font-bold text-success-600">{buySignals}</div>
            <div className="text-sm text-success-700">Sinyal Beli</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">{neutralSignals}</div>
            <div className="text-sm text-gray-700">Netral</div>
          </div>
          <div className="text-center p-4 bg-danger-50 rounded-lg border border-danger-200">
            <div className="text-2xl font-bold text-danger-600">{sellSignals}</div>
            <div className="text-sm text-danger-700">Sinyal Jual</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Rekomendasi Analisa</h3>
              <p className="text-blue-800 text-sm">
                {overallSignal === 'buy' 
                  ? 'Mayoritas indikator menunjukkan sinyal bullish. Pertimbangkan untuk membeli dengan stop loss yang ketat.'
                  : overallSignal === 'sell'
                  ? 'Mayoritas indikator menunjukkan sinyal bearish. Pertimbangkan untuk menjual atau menunggu konfirmasi lebih lanjut.'
                  : 'Sinyal campuran dari berbagai indikator. Tunggu konfirmasi yang lebih jelas sebelum mengambil posisi.'
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Technical Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{indicator.name}</h3>
              <div className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1 ${getSignalColor(indicator.signal)}`}>
                {getSignalIcon(indicator.signal)}
                <span className="capitalize">
                  {indicator.signal === 'buy' ? 'Beli' : indicator.signal === 'sell' ? 'Jual' : 'Netral'}
                </span>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-lg font-semibold text-gray-900">
                {typeof indicator.value === 'number' && indicator.value > 1000 
                  ? indicator.value.toLocaleString() 
                  : indicator.value
                }
              </div>
            </div>
            
            <p className="text-sm text-gray-600">{indicator.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Support & Resistance Levels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary-500" />
          Level Support & Resistance
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-success-600">Support Levels</h4>
            <div className="space-y-2">
              {[51200, 50800, 50400].map((level, index) => (
                <div key={level} className="flex items-center justify-between p-2 bg-success-50 rounded border border-success-200">
                  <span className="text-sm text-success-700">S{index + 1}</span>
                  <span className="font-medium text-success-800">${level.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3 text-danger-600">Resistance Levels</h4>
            <div className="space-y-2">
              {[52800, 53200, 53600].map((level, index) => (
                <div key={level} className="flex items-center justify-between p-2 bg-danger-50 rounded border border-danger-200">
                  <span className="text-sm text-danger-700">R{index + 1}</span>
                  <span className="font-medium text-danger-800">${level.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}