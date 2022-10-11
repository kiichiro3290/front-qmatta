import { SignUpPagePresenter } from './presenter'

import { signUpUser } from '~/pages/api/user'

import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export const SignUpPage: React.FC = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  const router = useRouter()

  const handleCloseSnackbar = useCallback(() => {
    setIsOpenSnackbar(false)
  }, [])

  const onClickSignUpButton = useCallback(
    async (email: string, password: string) => {
      // 認証情報 (E-mailとパスワード)をバックエンドに送信する
      const result = await signUpUser(email, password)
      if (result.result) {
        setSnackbarMessage('アカウントを作成しました')
        setIsOpenSnackbar(true)
        router.push('login')
        return
      } else {
        setSnackbarMessage('アカウント作成に失敗しました')
        setIsOpenSnackbar(true)
        return
      }
    },
    []
  )

  return (
    <SignUpPagePresenter
      handleCloseSnackbar={handleCloseSnackbar}
      isOpenSnackbar={isOpenSnackbar}
      snackbarMessage={snackbarMessage}
      onClickSignUpButton={onClickSignUpButton}
    />
  )
}
