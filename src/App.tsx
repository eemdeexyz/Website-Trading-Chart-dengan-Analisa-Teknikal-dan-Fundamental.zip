import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import TradingChart from './components/TradingChart'
import TechnicalAnalysis from './components/TechnicalAnalysis'
import FundamentalAnalysis from './components/FundamentalAnalysis'
import MarketOverview from './components/MarketOverview'
import AlertSystem from './components/AlertSystem'
import Watchlist from './components/Watchlist'
import { MarketDataProvider } from './contexts/MarketDataContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [activeTab, setActiveTab] = useState<'technical' | 'fundamental' | 'overview'>('technical')
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <MarketDataProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
          <Header 
            selectedSymbol={selectedSymbol}
            onSymbolChange={setSelectedSymbol}
          />
          
          <div className="flex">
            {/* Sidebar */}
            <motion.aside
              initial={false}
              animate={{ width: sidebarCollapsed ? 60 : 320 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm flex-shrink-0"
            >
              <div className="h-[calc(100vh-73px)] overflow-hidden">
                <div className="p-4">
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="absolute top-4 -right-3 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
                  >
                    {sidebarCollapsed ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronLeft className="w-3 h-3" />
                    )}
                  </button>

                  <AnimatePresence mode="wait">
                    {!sidebarCollapsed ? (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Watchlist onSymbolSelect={setSelectedSymbol} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col items-center pt-8"
                      >
                        <Star className="w-6 h-6 text-yellow-500" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <div className="container mx-auto px-4 py-6 space-y-6 max-w-none">
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
                <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  {[
                    { id: 'technical', label: 'Analisa Teknikal', icon: '📊', shortLabel: 'Technical' },
                    { id: 'fundamental', label: 'Analisa Fundamental', icon: '📈', shortLabel: 'Fundamental' },
                    { id: 'overview', label: 'Market Overview', icon: '🌐', shortLabel: 'Overview' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-500 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.shortLabel}</span>
                    </button>
                  ))}
                </div>

                {/* Content Sections */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
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
                </AnimatePresence>
              </div>
            </main>
          </div>

          <AlertSystem />
        </div>
      </NotificationProvider>
    </MarketDataProvider>
  )
}

export default App