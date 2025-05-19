"use client"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  date: string
}

// Client-side form submission function
export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    if (!name || !email || !subject || !message) {
      return { success: false, message: "All fields are required" }
    }

    const newContact: ContactFormData = {
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
    }

    // Store in localStorage for static sites
    try {
      const storedContacts = localStorage.getItem('contactSubmissions') || '[]'
      const contacts = JSON.parse(storedContacts)
      contacts.push(newContact)
      localStorage.setItem('contactSubmissions', JSON.stringify(contacts))

      // For production, you could integrate an external service here
      // Example: Send to a form endpoint service
      // await fetch('https://formspree.io/f/your-form-id', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify(newContact)
      // })

      return { success: true, message: "Message sent successfully!" }
    } catch (e) {
      console.error("Error saving contact:", e)
      return { success: false, message: "Failed to store contact information" }
    }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}