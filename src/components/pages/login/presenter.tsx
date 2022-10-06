import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'

export type LogInPagePresenterProps = {
  onClickLoginButton: (email: string, password: string) => void
  isOpenSnackbar: boolean
  handleCloseSnackbar: () => void
  snackbarMessage: string
}

export const LogInPagePresenter: React.FC<LogInPagePresenterProps> = ({
  handleCloseSnackbar,
  isOpenSnackbar,
  onClickLoginButton,
  snackbarMessage,
}) => {
  const iconSrc = '/kosenLab.svg'
  return (
    <Box>
      <Box sx={{ maxWidth: '540px', mt: '64px', mx: 'auto', p: '48px', textAlign: 'center' }}>
        <Box component='img' alt='' src={iconSrc} sx={{ display: 'block', mx: 'auto', width: { sm: 200, xs: 140 } }} />
        <Typography variant='inherit' component='h2' sx={{ my: '16px' }}>
          ログインする
        </Typography>
        <PasswordAuthForm onClickSubmitButton={onClickLoginButton} buttonText='ログイン' />
        <Box display='flex' flexDirection='column' sx={{ mt: '12px' }}>
          <Link href='/resetPassword'>
            <Button sx={{ justifyContent: 'left' }}>パスワードを忘れた方はこちら</Button>
          </Link>
          <Link href='/signup'>
            <Button sx={{ justifyContent: 'left' }}>新規登録はこちら</Button>
          </Link>
        </Box>

        <Snackbar
          open={isOpenSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          sx={{ top: { md: 180, sm: 180, xs: 160 } }}
        >
          <Alert severity='error'>{snackbarMessage}</Alert>
        </Snackbar>
      </Box>
    </Box>
  )
}
