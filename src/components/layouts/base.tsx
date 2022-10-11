import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline } from '@mui/material'
import { FC, ReactNode } from 'react'
import { lightTheme } from '~/theme'
import { GetLayout } from '~/types/next'

type BaseLayoutProps = {
  children: ReactNode
}

export const getBaseLayout: GetLayout = (page) => (
  <BaseLayout>{page}</BaseLayout>
)

const BaseLayout: FC<BaseLayoutProps> = (props) => {
  return <Layout {...props} />
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>{children}</Box>
    </ThemeProvider>
  )
}
