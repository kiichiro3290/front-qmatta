import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { logInUser } from '~/pages/api/user'
import { LogInPagePresenter } from './presenter'

export const LogInPage: React.FC = () => {
  const router = useRouter()

  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  // ログインボタン押下時に走る関数
  const onClickLoginButton = useCallback(async (email: string, password: string) => {
    // メールアドレスとパスワードを認証する
    const result = await logInUser(email, password)
    if (result.result) {
      router.push('/')
      return
    } else {
      setSnackbarMessage('ログインに失敗しました')
      setIsOpenSnackbar(true)
      return
    }
  }, [])

  const handleCloseSnackbar = useCallback(() => {
    setIsOpenSnackbar(false)
  }, [])

  return (
    <LogInPagePresenter
      onClickLoginButton={onClickLoginButton}
      isOpenSnackbar={isOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      snackbarMessage={snackbarMessage}
    />
  )
}
