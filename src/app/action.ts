"use server"

import fs from "fs"
import path from "path"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  date: string
}

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

    // Create absolute path to data directory at project root
    const projectRoot = path.resolve(process.cwd())
    const dataDir = path.join(projectRoot, "data")
    const filePath = path.join(dataDir, "contacts.json")
    
    console.log("Saving contact to:", filePath)

    // Create directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      console.log("Creating directory:", dataDir)
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // Read existing contacts or create empty array
    let contacts: ContactFormData[] = []
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8")
      try {
        contacts = JSON.parse(fileContent)
        if (!Array.isArray(contacts)) {
          console.log("File exists but content is not an array, resetting")
          contacts = []
        }
      } catch (e) {
        console.log("Error parsing JSON file, resetting:", e)
        contacts = []
      }
    } else {
      console.log("File doesn't exist, creating new file")
    }

    // Add new contact
    contacts.push(newContact)

    // Write back to file with proper permissions
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), { 
      encoding: 'utf8',
      mode: 0o666 // Read and write for everyone
    })

    console.log("Contact saved successfully")
    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error submitting form:", error)
    return { success: false, message: "Failed to send message. Please try again." }
  }
}