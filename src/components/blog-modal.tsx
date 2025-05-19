"use client"
import { X, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  date: string
  readTime: string
  image: string
}

export default function BlogModal({ isOpen, onClose, title, content, date, readTime, image }: BlogModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
        style={{position: 'fixed', zIndex: 100}}
      />
      
      <div 
        className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto z-[110]"
        style={{
          position: 'relative',
          zIndex: 110,
          margin: '0 auto',
          animation: 'modalFadeIn 0.3s ease-out'
        }}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-gray-800"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Image */}
        <div className="relative w-full aspect-video">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>

          <div className="prose dark:prose-invert max-w-none">
            {content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}