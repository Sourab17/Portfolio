"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsOpen(false)
  }

  const navigationOptions = [
    { label: "About Me", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Achievements", id: "achievements" },
    { label: "Blog", id: "blog" },
    { label: "Contact", id: "contact" },
  ]

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:shadow-xl transition-all"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gray-100 dark:bg-gray-800 py-3 px-4 flex flex-row justify-between items-center">
                <h3 className="font-medium">Navigate Portfolio</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Hi there! I&#39;m Sourab&#39;s assistant. Where would you like to go?
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {navigationOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => handleNavigation(option.id)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
