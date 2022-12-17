import { Header } from '../uiParts/Header/Header'

import { store } from '~/store'
import { selectTheme, setMode } from '~/store/theme/themeSlice'
import { GetLayout } from '~/types/next'

import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import { FC, Fragment, ReactNode, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

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
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // デバイスのモードを取得する
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    dispatch(setMode(prefersDarkMode ? 'dark' : 'light'))
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>
        <Header />
        <Box component='div' sx={{ mt: theme.spacing(8) }} />
        {children}
      </Fragment>
    </ThemeProvider>
  )
}
