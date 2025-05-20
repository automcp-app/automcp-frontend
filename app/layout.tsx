import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from 'geist/font/sans';

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
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
