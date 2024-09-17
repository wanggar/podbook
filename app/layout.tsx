import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Podcast Transcription and Translation Tool',
  description: 'Transcribe and translate podcasts from YouTube',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen">{children}</body>
    </html>
  )
}
