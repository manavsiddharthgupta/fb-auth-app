'use client'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { usePathname } from 'next/navigation'
import { FacebookProvider } from './fb-session'

const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className={inter.className + ' min-h-screen'}>
      <FacebookProvider>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </FacebookProvider>
    </body>
  )
}

export default Providers
