import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import React from 'react'
import { defaultTheme } from '~/styles/themes/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
