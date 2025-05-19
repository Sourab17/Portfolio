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

      // Alternative method: Use an iframe to submit the form directly
      // This is more reliable than the fetch method for Google Forms
      const formIframe = document.createElement('iframe');
      formIframe.style.display = 'none';
      document.body.appendChild(formIframe);

      // Build form in iframe
      const googleFormId = "1FAIpQLSdiU8hjaxrqw4Bm07liJqz3RdoJWj_Xcecx5FI9HbJJzYJEAw";
      const formUrl = `https://docs.google.com/forms/d/e/${googleFormId}/formResponse`;
      
      // Create form HTML
      const formEntryIds = {
        name: "entry.2005620554",
        email: "entry.1045781291",
        subject: "entry.1065046570",
        message: "entry.839337160"
      };

      // Create hidden form inside the iframe
      const doc = formIframe.contentDocument || formIframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <form action="${formUrl}" method="post" id="google-form">
            <input name="${formEntryIds.name}" value="${encodeURIComponent(formData.name)}">
            <input name="${formEntryIds.email}" value="${encodeURIComponent(formData.email)}">
            <input name="${formEntryIds.subject}" value="${encodeURIComponent(formData.subject)}">
            <textarea name="${formEntryIds.message}">${encodeURIComponent(formData.message)}</textarea>
          </form>
          <script>document.getElementById('google-form').submit();</script>
        `);
        doc.close();
      }

      // Remove iframe after submission (after a short delay)
      setTimeout(() => {
        document.body.removeChild(formIframe);
      }, 1000);

      // Show success message
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });

      // Reset the form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      if (formRef.current) formRef.current.reset();
      
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 dark:text-white resize-none"
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