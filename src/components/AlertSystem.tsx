import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, TrendingUp, TrendingDown, Bell } from 'lucide-react'
import { useNotification } from '../contexts/NotificationContext'
import toast from 'react-hot-toast'

export default function AlertSystem() {
  const { notifications, removeNotification } = useNotification()

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const alerts = [
        {
          type: 'price' as const,
          title: 'Price Alert',
          message: 'BTC mencapai target $52,500',
          severity: 'success' as const
        },
        {
          type: 'technical' as const,
          title: 'Technical Signal',
          message: 'RSI ETH memasuki zona oversold',
          severity: 'warning' as const
        },
        {
          type: 'news' as const,
          title: 'Market News',
          message: 'Fed mengumumkan keputusan suku bunga',
          severity: 'info' as const
        }
      ]

      if (Math.random() > 0.7) { // 30% chance every interval
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)]
        toast.success(randomAlert.message, {
          icon: '🚨',
          duration: 5000,
        })
      }
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price':
        return <TrendingUp className="w-5 h-5" />
      case 'technical':
        return <AlertTriangle className="w-5 h-5" />
      case 'news':
        return <Bell className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'bg-success-50 border-success-200 text-success-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'error':
        return 'bg-danger-50 border-danger-200 text-danger-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`p-4 rounded-lg border shadow-lg backdrop-blur-sm ${getSeverityColor(notification.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getAlertIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{notification.title}</h4>
                  <p className="text-sm opacity-90">{notification.message}</p>
                  <div className="text-xs opacity-75 mt-2">
                    {new Date(notification.timestamp).toLocaleTimeString('id-ID')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 p-1 hover:bg-black/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}