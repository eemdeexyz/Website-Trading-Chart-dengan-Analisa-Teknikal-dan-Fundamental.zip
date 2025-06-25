import React, { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts'
import { motion } from 'framer-motion'
import { useMarketData } from '../contexts/MarketDataContext'
import { BarChart3, TrendingUp, TrendingDown, Activity, Maximize2, Volume2 } from 'lucide-react'
import TimeFrameSelector from './TimeFrameSelector'
import { TimeFrame } from '../types'

interface TradingChartProps {
  symbol: string
}

export default function TradingChart({ symbol }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('1d')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { marketData, fetchMarketData } = useMarketData()

  // Get dark mode from document class
  const isDark = document.documentElement.classList.contains('dark')

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart with dynamic theme
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: isFullscreen ? window.innerHeight - 100 : 500,
      layout: {
        background: { color: isDark ? '#1f2937' : '#ffffff' },
        textColor: isDark ? '#f9fafb' : '#333333',
      },
      grid: {
        vertLines: { color: isDark ? '#374151' : '#f0f0f0' },
        horzLines: { color: isDark ? '#374151' : '#f0f0f0' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: isDark ? '#4b5563' : '#e1e1e1',
        textColor: isDark ? '#9ca3af' : '#666666',
      },
      timeScale: {
        borderColor: isDark ? '#4b5563' : '#e1e1e1',
        textColor: isDark ? '#9ca3af' : '#666666',
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

    // Create volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#9ca3af',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    })

    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    chartRef.current = chart
    candlestickSeriesRef.current = candlestickSeries
    volumeSeriesRef.current = volumeSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: isFullscreen ? window.innerHeight - 100 : 500,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [isDark, isFullscreen])

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        await fetchMarketData(symbol)
        
        // Generate sample candlestick data based on timeframe
        const data: CandlestickData[] = []
        const volumeData: any[] = []
        const now = Date.now()
        
        // Adjust interval based on timeframe
        const intervals = {
          '1m': 60 * 1000,
          '5m': 5 * 60 * 1000,
          '15m': 15 * 60 * 1000,
          '1h': 60 * 60 * 1000,
          '4h': 4 * 60 * 60 * 1000,
          '1d': 24 * 60 * 60 * 1000,
          '1w': 7 * 24 * 60 * 60 * 1000,
          '1M': 30 * 24 * 60 * 60 * 1000,
        }

        const interval = intervals[selectedTimeFrame]
        const dataPoints = selectedTimeFrame === '1m' ? 100 : selectedTimeFrame === '5m' ? 200 : 300
        
        for (let i = dataPoints; i >= 0; i--) {
          const time = (now - i * interval) / 1000
          const basePrice = 50000 + Math.random() * 10000
          const open = basePrice + (Math.random() - 0.5) * 1000
          const close = open + (Math.random() - 0.5) * 2000
          const high = Math.max(open, close) + Math.random() * 500
          const low = Math.min(open, close) - Math.random() * 500
          const volume = Math.random() * 1000000
          
          data.push({
            time: time as any,
            open,
            high,
            low,
            close,
          })

          volumeData.push({
            time: time as any,
            value: volume,
            color: close > open ? '#22c55e40' : '#ef444440',
          })
        }

        if (candlestickSeriesRef.current) {
          candlestickSeriesRef.current.setData(data)
        }

        if (volumeSeriesRef.current) {
          volumeSeriesRef.current.setData(volumeData)
        }
      } catch (error) {
        console.error('Error loading chart data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [symbol, selectedTimeFrame, fetchMarketData])

  const currentPrice = marketData[symbol]?.price || 0
  const priceChange = marketData[symbol]?.change || 0
  const priceChangePercent = marketData[symbol]?.changePercent || 0
  const volume24h = marketData[symbol]?.volume || 0

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    // Update chart size after state change
    setTimeout(() => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: isFullscreen ? 500 : window.innerHeight - 100,
        })
      }
    }, 100)
  }

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6' : ''}`}>
      {/* Price Info Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{symbol}</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
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

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                <span>Vol: ${(volume24h / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex items-center gap-1">
                <Activity className="w-4 h-4" />
                <span>Live</span>
                <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TimeFrameSelector 
            selectedTimeFrame={selectedTimeFrame}
            onTimeFrameChange={setSelectedTimeFrame}
          />
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
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
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600 dark:text-gray-400">Loading chart data...</span>
            </div>
          </div>
        )}
        
        <div 
          ref={chartContainerRef}
          className={`w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${
            isFullscreen ? 'h-[calc(100vh-200px)]' : 'h-[500px]'
          }`}
        />
      </motion.div>

      {isFullscreen && (
        <div className="flex justify-center">
          <button
            onClick={toggleFullscreen}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Exit Fullscreen
          </button>
        </div>
      )}
    </div>
  )
}