"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface AchievementCardProps {
  title: string
  description: string
  year: string
}

export default function AchievementCard({ title, description, year }: AchievementCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <Award className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">{title}</h3>
                <span className="text-sm px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">{year}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
