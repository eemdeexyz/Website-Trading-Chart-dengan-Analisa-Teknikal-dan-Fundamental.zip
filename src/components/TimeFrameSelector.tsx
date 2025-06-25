import React from 'react'
import { motion } from 'framer-motion'
import { TimeFrame } from '../types'

interface TimeFrameSelectorProps {
  selectedTimeFrame: TimeFrame
  onTimeFrameChange: (timeFrame: TimeFrame) => void
}

const timeFrames: { value: TimeFrame; label: string }[] = [
  { value: '1m', label: '1m' },
  { value: '5m', label: '5m' },
  { value: '15m', label: '15m' },
  { value: '1h', label: '1h' },
  { value: '4h', label: '4h' },
  { value: '1d', label: '1d' },
  { value: '1w', label: '1w' },
  { value: '1M', label: '1M' },
]

export default function TimeFrameSelector({ selectedTimeFrame, onTimeFrameChange }: TimeFrameSelectorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
      {timeFrames.map((tf) => (
        <motion.button
          key={tf.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTimeFrameChange(tf.value)}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedTimeFrame === tf.value
              ? 'bg-primary-500 text-white shadow-md'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-600'
          }`}
        >
          {tf.label}
        </motion.button>
      ))}
    </div>
  )
}
