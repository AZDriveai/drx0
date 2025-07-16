import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dr.X - مساعد ذكي",
  description: "Dr.X هو مساعد ذكي مصمم لتقديم إجابات دقيقة وموضوعية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
