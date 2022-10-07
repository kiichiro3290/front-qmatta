import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logInUser } from '~/pages/api/user'
import { AppDispatch } from '~/store'
import { fetchUserDataState } from '~/store/user/actions'
import { LogInPagePresenter } from './presenter'

export const LogInPage: React.FC = () => {
  const router = useRouter()
  const dispatch: AppDispatch = useDispatch()

  const [isOpenSnackbar, setIsOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  // ログインボタン押下時に走る関数
  const onClickLoginButton = useCallback(async (email: string, password: string) => {
    // メールアドレスとパスワードを認証する
    const result = await logInUser(email, password)
    if (result.result) {
      localStorage.setItem('email', email)
      localStorage.setItem('password', password)
      dispatch(fetchUserDataState(result.user))
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
