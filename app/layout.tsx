// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProviderCustom } from "@/components/context/ThemeContext"
import { LayoutProvider } from "@/components/context/LayoutContext"
import { DashboardLayout } from "@/components/layouts/DashboardLayout"


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ADmyBRAND Insights',
  description: 'AI-powered analytics dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderCustom>
          <LayoutProvider>
            <DashboardLayout>
              {children}
            </DashboardLayout>
          </LayoutProvider>
        </ThemeProviderCustom>
      </body>
    </html>
  )
}
