import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Portfolio | John Doe",
  description: "Personal portfolio of John Doe, a software developer specializing in web development.",
}

export default function Home() {
  return <ClientPage />
}
