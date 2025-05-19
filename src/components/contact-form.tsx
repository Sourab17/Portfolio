"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const formRef = useRef<HTMLFormElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Get form data
      const formDataObj = new FormData(event.currentTarget)
      
      // Store in localStorage for offline backup
      try {
        const newContact = {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          date: new Date().toISOString(),
        }
        
        const storedContacts = localStorage.getItem('contactSubmissions') || '[]'
        const contacts = JSON.parse(storedContacts)
        contacts.push(newContact)
        localStorage.setItem('contactSubmissions', JSON.stringify(contacts))
      } catch (e) {
        console.error("Error saving to localStorage:", e)
      }

      // Send to Formspree
      const response = await fetch("https://formspree.io/f/your-formspree-form-id", {
        method: "POST",
        body: formDataObj,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your message has been sent. We'll get back to you soon!",
        })
        // Reset the form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
        // Also reset the actual form element
        if (formRef.current) formRef.current.reset()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to send the message")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium dark:text-gray-400">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:text-white"
              placeholder="Your name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium dark:text-gray-400">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:text-white"
              placeholder="Your email"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium dark:text-gray-400">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:text-white"
            placeholder="Subject"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium dark:text-gray-400">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:text-white"
            placeholder="Your message"
            required
          ></textarea>
        </div>
        <Button
          type="submit"
          className="w-full rounded-lg bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
      <Toaster />
    </>
  )
}