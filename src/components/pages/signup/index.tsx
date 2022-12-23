import { SignUpPagePresenter } from './presenter'

import { signUpUser } from '~/api/client/back/user'

import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'

export type SnackbarInfoType = {
  message: string
  type: 'error' | 'success'
}

export const SignUpPage: React.FC = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarInfo, setSnackbarInfo] = useState<SnackbarInfoType>({
    message: '',
    type: 'error',
  })

  const router = useRouter()

  const handleCloseSnackbar = useCallback(() => {
    setIsOpenSnackbar(false)
  }, [])

  const onClickSignUpButton = useCallback(
    async (email: string, password: string) => {
      // 認証情報 (E-mailとパスワード)をバックエンドに送信する
      const res = await signUpUser(email, password)
      if (!res.error && res.message) {
        setSnackbarInfo({
          message: res.message,
          type: 'success',
        })
        setIsOpenSnackbar(true)
        router.push('/login')
        return
      } else {
        if (res.errorMessage) {
          setSnackbarInfo({
            message: res.errorMessage,
            type: 'error',
          })
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
      snackbarInfo={snackbarInfo}
      onClickSignUpButton={onClickSignUpButton}
    />
  )
}
