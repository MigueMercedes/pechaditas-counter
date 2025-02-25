import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GymPro - Pechadas Counter",
  description: "Track your daily push-ups and compete with others!",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="flex h-screen">
              <AppSidebar />
              <main className="flex-1 overflow-y-auto bg-background p-4">{children}</main>
            </div>
            <Toaster />
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'