"use client"

import { motion } from "framer-motion"
import { CalendarIcon } from "lucide-react"

interface TimelineItemProps {
  title: string
  organization: string
  period: string
  description: string | string[]
  isLast?: boolean
}

export default function TimelineItem({ title, organization, period, description, isLast = false }: TimelineItemProps) {
  const isArrayDescription = Array.isArray(description)
  
  return (
    <div className="relative pl-8 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-3 top-3 bottom-0 w-[1px] bg-gray-300 dark:bg-gray-700 transform translate-x-[0.5px]"></div>
      )}

      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-0 top-3 w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center"
      >
        <CalendarIcon className="h-3 w-3 text-gray-500 dark:text-gray-400" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">{period}</span>
        </div>
        <p className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">{organization}</p>
        
        {isArrayDescription ? (
          <ul className="list-disc list-outside ml-5 space-y-2">
            {description.map((item, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-400">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        )}
      </motion.div>
    </div>
  )
}
