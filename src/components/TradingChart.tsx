import React, { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts'
import { motion } from 'framer-motion'
import { useMarketData } from '../contexts/MarketDataContext'
import { BarChart3, TrendingUp, TrendingDown, Activity } from 'lucide-react'

interface TradingChartProps {
  symbol: string
}

export default function TradingChart({ symbol }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { marketData, fetchMarketData } = useMarketData()

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#e1e1e1',
      },
      timeScale: {
        borderColor: '#e1e1e1',
        timeVisible: true,
        secondsVisible: false,
      },
    })

    // Create candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      wickUpColor: '#22c55e',
    })

    chartRef.current = chart
    candlestickSeriesRef.current = candlestickSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await fetchMarketData(symbol)
        
        // Generate sample candlestick data
        const data: CandlestickData[] = []
        const now = Date.now()
        const oneDay = 24 * 60 * 60 * 1000
        
        for (let i = 100; i >= 0; i--) {
          const time = (now - i * oneDay) / 1000
          const basePrice = 50000 + Math.random() * 10000
          const open = basePrice + (Math.random() - 0.5) * 1000
          const close = open + (Math.random() - 0.5) * 2000
          const high = Math.max(open, close) + Math.random() * 500
          const low = Math.min(open, close) - Math.random() * 500
          
          data.push({
            time: time as any,
            open,
            high,
            low,
            close,
          })
        }

        if (candlestickSeriesRef.current) {
          candlestickSeriesRef.current.setData(data)
        }
      } catch (error) {
        console.error('Error loading chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [symbol, fetchMarketData])

  const currentPrice = marketData[symbol]?.price || 0
  const priceChange = marketData[symbol]?.change || 0
  const priceChangePercent = marketData[symbol]?.changePercent || 0

  return (
    <div className="space-y-4">
      {/* Price Info Header */}
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900">{symbol}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                ${currentPrice.toLocaleString()}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                priceChange >= 0 ? 'text-success-600' : 'text-danger-600'
              }`}>
                {priceChange >= 0 ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}</span>
                <span>({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Activity className="w-4 h-4" />
            <span>Live</span>
          </div>
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Chart Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Loading chart data...</span>
            </div>
          </div>
        )}
        
        <div 
          ref={chartContainerRef}
          className="w-full h-[500px] rounded-lg border border-gray-200 bg-white"
        />
      </motion.div>
    </div>
  )
}