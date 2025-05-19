import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Portfolio | Praveen Kumar G",
  description: "Personal portfolio of Praveen Kumar G, a software developer specializing in web development.",
}

export default function Home() {
  return <ClientPage />
}
