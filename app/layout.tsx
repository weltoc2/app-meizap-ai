import type { Metadata } from 'next'
import import '../src/app/globals.css'


export const metadata: Metadata = {
  title: 'MEIZap - Assistente Virtual para MEIs',
  description: 'Seu contador virtual no WhatsApp — 24h por dia, sem enrolação.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
