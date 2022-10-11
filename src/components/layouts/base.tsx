import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline } from '@mui/material'
import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '~/store'
import { lightTheme } from '~/theme'
import { GetLayout } from '~/types/next'
import { Header } from '../uiParts/Header/Header'

type BaseLayoutProps = {
  children: ReactNode
}

export const getBaseLayout: GetLayout = (page) => (
  <BaseLayout>{page}</BaseLayout>
)

const BaseLayout: FC<BaseLayoutProps> = (props) => {
  return (
    <Provider store={store}>
      <Layout {...props} />
    </Provider>
  )
}

const Layout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box>
        <Header />
        {children}
      </Box>
    </ThemeProvider>
  )
}
