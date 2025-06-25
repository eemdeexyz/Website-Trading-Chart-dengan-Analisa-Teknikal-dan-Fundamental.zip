import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import TradingChart from './components/TradingChart'
import TechnicalAnalysis from './components/TechnicalAnalysis'
import FundamentalAnalysis from './components/FundamentalAnalysis'
import MarketOverview from './components/MarketOverview'
import AlertSystem from './components/AlertSystem'
import { MarketDataProvider } from './contexts/MarketDataContext'
import { NotificationProvider } from './contexts/NotificationContext'

function App() {
  const [activeTab, setActiveTab] = useState<'technical' | 'fundamental' | 'overview'>('technical')
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT')

  return (
    <MarketDataProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Header 
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
          
          <main className="container mx-auto px-4 py-6 space-y-6">
            {/* Chart Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="chart-container"
            >
              <TradingChart symbol={selectedSymbol} />
            </motion.div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
              {[
                { id: 'technical', label: 'Analisa Teknikal', icon: '📊' },
                { id: 'fundamental', label: 'Analisa Fundamental', icon: '📈' },
                { id: 'overview', label: 'Market Overview', icon: '🌐' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'technical' && (
                <TechnicalAnalysis symbol={selectedSymbol} />
              )}
              {activeTab === 'fundamental' && (
                <FundamentalAnalysis symbol={selectedSymbol} />
              )}
              {activeTab === 'overview' && (
                <MarketOverview />
              )}
            </motion.div>
          </main>

          <AlertSystem />
        </div>
      </NotificationProvider>
    </MarketDataProvider>
  )
}

export default App