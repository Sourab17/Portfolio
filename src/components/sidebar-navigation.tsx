"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Briefcase, GraduationCap, Award, FileText, Mail, Layers, X, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"
import portfolioData from "@/data/portfolio-data.json"
import profileImage from "../photos/profile.jpeg"

export default function SidebarNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Handle clicks outside the sidebar to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("resize", checkMobile)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, isOpen])

  const handleNavigation = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    if (isMobile) setIsOpen(false)
  }

  const getIconForNavItem = (id: string) => {
    switch (id) {
      case "about":
        return <Home className="h-5 w-5" />
      case "projects":
        return <Layers className="h-5 w-5" />
      case "experience":
        return <Briefcase className="h-5 w-5" />
      case "education":
        return <GraduationCap className="h-5 w-5" />
      case "skills":
        return <FileText className="h-5 w-5" />
      case "achievements":
        return <Award className="h-5 w-5" />
      case "blog":
        return <FileText className="h-5 w-5" />
      case "contact":
        return <Mail className="h-5 w-5" />
      default:
        return <Home className="h-5 w-5" />
    }
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={isMobile ? { x: "-100%" } : { x: 0 }}
        animate={isMobile ? { x: isOpen ? 0 : "-100%" } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-900 shadow-lg flex flex-col ${
          isMobile ? "lg:hidden" : "hidden lg:flex"
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold dark:text-white">{portfolioData.personal.name}</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-2">
            {portfolioData.navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={() => handleNavigation(item.id)}
              >
                {getIconForNavItem(item.id)}
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src={profileImage.src}
              alt={portfolioData.personal.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-sm dark:text-white">{portfolioData.personal.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{portfolioData.personal.title}</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main content padding for desktop */}
      <div className="hidden lg:block w-64"></div>
    </>
  )
}
