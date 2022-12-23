import { LogInPagePresenter } from './presenter'

import { logInUser } from '~/api/client/back/user'
import { AppDispatch } from '~/store'
import { fetchUserDataState } from '~/store/user/actions'

import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

export const LogInPage: React.FC = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ログインボタン押下時に走る関数
  const onClickLoginButton = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      // メールアドレスとパスワードを認証する
      const res = await logInUser(email, password)
      if (!res.error && res.expire && res.token) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('expire', res.expire)
        dispatch(fetchUserDataState())

        setIsLoading(false)
        router.push('/')
        return
      } else {
        console.log(res.errorMessage)
        setSnackbarMessage('ログインに失敗しました')
        setIsOpenSnackbar(true)
        setIsLoading(false)

        return
      }
    },
    []
  )

  const handleCloseSnackbar = useCallback(() => {
    setIsOpenSnackbar(false)
  }, [])

  return (
    <LogInPagePresenter
      handleCloseSnackbar={handleCloseSnackbar}
      isLoading={isLoading}
      isOpenSnackbar={isOpenSnackbar}
      snackbarMessage={snackbarMessage}
      onClickLoginButton={onClickLoginButton}
    />
  )
}
