"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BlogModal from "./blog-modal"

interface BlogCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  image: string
  content: string
  index: number
}

export default function BlogCard({ title, excerpt, date, readTime, image, content, index }: BlogCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="border-0 shadow-lg h-full flex flex-col">
          <div className="relative overflow-hidden aspect-video">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
            />
          </div>
          <CardContent className="p-6 flex-grow">
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{excerpt}</p>
          </CardContent>
          <CardFooter className="px-6 pb-6 pt-0">
            <Button
              variant="ghost"
              className="p-0 h-auto font-medium hover:bg-transparent hover:text-gray-900 dark:hover:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        content={content}
        date={date}
        readTime={readTime}
        image={image}
      />
    </>
  )
}
