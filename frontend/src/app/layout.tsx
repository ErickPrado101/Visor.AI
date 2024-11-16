import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { AppProvider } from './contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Plataforma de Previsão de Vendas',
  description: 'Insights estratégicos para supervisores de vendas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AppProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}