import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AutoMCP",
  description: "Build your MCP endpoint with ease",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
