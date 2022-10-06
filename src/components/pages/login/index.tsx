import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { LogInPagePresenter } from './presenter'

export const LogInPage: React.FC = () => {
  const router = useRouter()

  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  // ログインボタン押下時に走る関数
  const onClickLoginButton = useCallback((email: string, password: string) => {
    // メールアドレスとパスワードを認証する
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
