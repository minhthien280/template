'use client'

import { ThemeProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'
import siteMetadata from '@/data/siteMetadata'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      <NextUIProvider>{children}</NextUIProvider>
    </ThemeProvider>
  )
}
