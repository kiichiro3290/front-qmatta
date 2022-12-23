import { SignUpPagePresenter } from './presenter'

import { signUpUser } from '~/api/client/back/user'

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
      const res = await signUpUser(email, password)
      if (!res.error && res.message) {
        setSnackbarMessage(res.message)
        setIsOpenSnackbar(true)
        router.push('login')
        return
      } else {
        if (res.message) {
          setSnackbarMessage(res.message)
          setIsOpenSnackbar(true)
          return
        }
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
