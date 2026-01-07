import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Portfolio | Sourab Gadipalli",
  description: "Personal portfolio of Sourab Gadipalli, a cybersecurity expert.",
}

export default function Home() {
  return <ClientPage />
}
