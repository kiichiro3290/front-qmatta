import { LogInPagePresenter } from './presenter'

import { getUserInfo, logInUser } from '~/api/client/back/user'
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

  // ログインボタン押下時に走る関数
  const onClickLoginButton = useCallback(
    async (email: string, password: string) => {
      // メールアドレスとパスワードを認証する
      const { code, token, expire } = await logInUser(email, password)
      if (code == 200) {
        localStorage.setItem('token', token)
        localStorage.setItem('expire', expire)

        router.push('/')
        return
      } else {
        setSnackbarMessage('ログインに失敗しました')
        setIsOpenSnackbar(true)
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
      isOpenSnackbar={isOpenSnackbar}
      snackbarMessage={snackbarMessage}
      onClickLoginButton={onClickLoginButton}
    />
  )
}
