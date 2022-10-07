import { useCallback, useState } from 'react'

import { SignUpPagePresenter } from './presenter'

export type SignUpPage = {
  //
}

export const SignUpPage: React.FC<SignUpPage> = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  const handleCloseSnackbar = useCallback(() => {
    setIsOpenSnackbar(false)
  }, [])

  const onClickSignUpButton = useCallback(async (email: string, password: string) => {
    // 認証情報 (E-mailとパスワード)をバックエンドに送信する
  }, [])

  return (
    <SignUpPagePresenter
      onClickSignUpButton={onClickSignUpButton}
      isOpenSnackbar={isOpenSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      snackbarMessage={snackbarMessage}
    />
  )
}
