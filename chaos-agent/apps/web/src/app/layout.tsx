import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from '@/components/providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Chaos-Agent.ai | Autonomous Swarm QA Testing',
  description: 'Fire your QA Team. Hire the Swarm. Autonomous AI agents that break your webapp before users do.',
  keywords: ['QA testing', 'autonomous agents', 'E2E testing', 'Playwright', 'AI testing'],
  openGraph: {
    title: 'Chaos-Agent.ai | Autonomous Swarm QA Testing',
    description: 'Fire your QA Team. Hire the Swarm.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#111',
                color: '#fff',
                border: '1px solid #333',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
