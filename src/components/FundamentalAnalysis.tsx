import React from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Globe, 
  Calendar, 
  AlertCircle,
  BookOpen,
  Activity
} from 'lucide-react'

interface FundamentalAnalysisProps {
  symbol: string
}

interface NewsItem {
  title: string
  summary: string
  impact: 'positive' | 'negative' | 'neutral'
  timestamp: string
}

interface MetricItem {
  label: string
  value: string
  change: number
  description: string
}

export default function FundamentalAnalysis({ symbol }: FundamentalAnalysisProps) {
  // Sample fundamental data (in real app, this would come from API)
  const metrics: MetricItem[] = [
    {
      label: 'Market Cap',
      value: '$1.2T',
      change: 2.5,
      description: 'Total nilai pasar cryptocurrency'
    },
    {
      label: 'Volume 24h',
      value: '$45.2B',
      change: -1.2,
      description: 'Volume perdagangan dalam 24 jam terakhir'
    },
    {
      label: 'Circulating Supply',
      value: '19.8M',
      change: 0.1,
      description: 'Jumlah koin yang beredar di pasar'
    },
    {
      label: 'Active Addresses',
      value: '1.2M',
      change: 5.8,
      description: 'Alamat aktif dalam 24 jam terakhir'
    }
  ]

  const news: NewsItem[] = [
    {
      title: 'Adopsi Institusional Meningkat',
      summary: 'Beberapa perusahaan besar mengumumkan investasi dalam Bitcoin sebagai treasury reserve.',
      impact: 'positive',
      timestamp: '2 jam yang lalu'
    },
    {
      title: 'Regulasi Crypto di Eropa',
      summary: 'Uni Eropa mengeluarkan framework regulasi baru untuk cryptocurrency yang lebih jelas.',
      impact: 'positive',
      timestamp: '5 jam yang lalu'
    },
    {
      title: 'Volatilitas Pasar Tinggi',
      summary: 'Pasar crypto mengalami volatilitas tinggi akibat ketidakpastian ekonomi global.',
      impact: 'negative',
      timestamp: '8 jam yang lalu'
    },
    {
      title: 'Upgrade Network Bitcoin',
      summary: 'Proposal upgrade untuk meningkatkan skalabilitas dan efisiensi network Bitcoin.',
      impact: 'positive',
      timestamp: '1 hari yang lalu'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-success-600 bg-success-50 border-success-200'
      case 'negative':
        return 'text-danger-600 bg-danger-50 border-danger-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4" />
      case 'negative':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Fundamental Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-500" />
          Analisa Fundamental {symbol}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                <div className={`text-xs px-2 py-1 rounded ${
                  metric.change >= 0 ? 'text-success-600 bg-success-50' : 'text-danger-600 bg-danger-50'
                }`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <p className="text-xs text-gray-500">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Market Sentiment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-500" />
          Sentimen Pasar
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="text-3xl font-bold text-success-600 mb-1">72%</div>
            <div className="text-sm text-success-700">Bullish</div>
            <div className="text-xs text-success-600 mt-1">Fear & Greed Index</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-3xl font-bold text-blue-600 mb-1">8.5</div>
            <div className="text-sm text-blue-700">Social Score</div>
            <div className="text-xs text-blue-600 mt-1">Media & Social Sentiment</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-1">65%</div>
            <div className="text-sm text-purple-700">Institutional</div>
            <div className="text-xs text-purple-600 mt-1">Institutional Interest</div>
          </div>
        </div>
      </motion.div>

      {/* News & Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-500" />
          Berita & Events Terkini
        </h3>

        <div className="space-y-4">
          {news.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 flex-1">{item.title}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ml-3 ${getImpactColor(item.impact)}`}>
                  {getImpactIcon(item.impact)}
                  <span className="capitalize">{item.impact}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{item.summary}</p>
              
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                <span>{item.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Economic Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary-500" />
          Kalender Ekonomi
        </h3>

        <div className="space-y-3">
          {[
            { date: 'Hari ini', event: 'Fed Interest Rate Decision', impact: 'high' },
            { date: 'Besok', event: 'US Inflation Data (CPI)', impact: 'high' },
            { date: '3 hari', event: 'Bitcoin Conference 2024', impact: 'medium' },
            { date: '1 minggu', event: 'Ethereum Upgrade Proposal', impact: 'medium' }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{item.event}</div>
                <div className="text-sm text-gray-500">{item.date}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                item.impact === 'high' 
                  ? 'bg-danger-100 text-danger-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {item.impact === 'high' ? 'High Impact' : 'Medium Impact'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}