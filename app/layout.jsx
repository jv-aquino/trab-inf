import './globals.css'
import '@fontsource/material-icons';

import { ClerkProvider } from '@clerk/nextjs'
import { ptBR } from '@clerk/localizations'

import { ModalProvider } from "@/providers/modal-provider"
import { ToastProvider } from "@/providers/toast-provider" 

export const metadata = {
  title: 'Painel administrativo',
  description: 'Painel administrativo do WLG Distrbuidor Pet',
}

export default async function RootLayout({ children }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-br">
        <body>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
