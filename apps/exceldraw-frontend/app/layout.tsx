import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DrawMaster - Professional Digital Drawing & Design Tool',
  description: 'Create stunning digital art with DrawMaster\'s powerful drawing tools, intuitive interface, and professional features. Start your creative journey today.',
  keywords: 'digital drawing, art software, illustration, design tool, creative app',
  authors: [{ name: 'Priyanshu' }],
  openGraph: {
    title: 'DrawMaster - Professional Digital Drawing & Design Tool',
    description: 'Create stunning digital art with DrawMaster\'s powerful drawing tools, intuitive interface, and professional features.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DrawMaster - Professional Digital Drawing & Design Tool',
    description: 'Create stunning digital art with DrawMaster\'s powerful drawing tools, intuitive interface, and professional features.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}