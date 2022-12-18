import { Header } from '../uiParts/Header/Header'

import { AppDispatch, store } from '~/store'
import { selectTheme, setMode } from '~/store/theme/themeSlice'
import { fetchUserDataState } from '~/store/user/actions'
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
  const dispatch: AppDispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // デバイスのモードを取得する
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    dispatch(setMode(prefersDarkMode ? 'dark' : 'light'))
  }, [prefersDarkMode])

  // 認証状態を確認する
  useEffect(() => {
    dispatch(fetchUserDataState())
  }, [])

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
