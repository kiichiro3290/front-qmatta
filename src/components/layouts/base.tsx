import { CommunityMenu } from './community'

import { Header } from '../uiParts/Header/Header'

import { baerApi } from '~/api/client/back/bear'
import { communityApi } from '~/api/client/back/community'
import { userApi } from '~/api/client/back/user'
import { AppDispatch, store } from '~/store'
import { selectTheme, setMode } from '~/store/theme/themeSlice'
import { fetchUserDataState } from '~/store/user/actions'
import { GetLayout } from '~/types/next'

import { ThemeProvider } from '@emotion/react'
import { Box, CssBaseline, useMediaQuery } from '@mui/material'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { FC, Fragment, ReactNode, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

type BaseLayoutProps = {
  children: ReactNode
  isCommunity: boolean
}

export const getBaseLayout: GetLayout = (page) => (
  <BaseLayout isCommunity={false}>{page}</BaseLayout>
)

export const getCommunityLayout: GetLayout = (page) => (
  <BaseLayout isCommunity={true}>{page}</BaseLayout>
)

const BaseLayout: FC<BaseLayoutProps> = (props) => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout {...props} />
      </Provider>
    </QueryClientProvider>
  )
}

const Layout: FC<BaseLayoutProps> = ({ children, isCommunity }) => {
  const dispatch: AppDispatch = useDispatch()
  const theme = useSelector(selectTheme)

  // デバイスのモードを取得する
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  useEffect(() => {
    dispatch(setMode(prefersDarkMode ? 'dark' : 'light'))
  }, [prefersDarkMode])

  // 認証状態を確認する→トークンがある場合のみ有効
  // TODO: トークンのリフレッシュ
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) dispatch(fetchUserDataState())
  }, [])

  // ユーザのアイコン画像を取得する
  useQuery(['user', 'icon'], userApi.getUserIcon)
  // コミュニティリストを取得する
  useQuery(['community', 'list'], communityApi.getCommunityList)

  // クマとの会話履歴を取得する
  useQuery(['bear', 'chatHistory'], baerApi.getChatHistory)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Fragment>
        <Header />
        {isCommunity && <CommunityMenu />}
        <Box component='div' sx={{ mt: theme.spacing(8) }} />
        {children}
      </Fragment>
    </ThemeProvider>
  )
}
