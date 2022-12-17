import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'

import { Alert, Box, Button, Snackbar, Typography } from '@mui/material'
import Link from 'next/link'
import { Fragment } from 'react'

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
  return (
    <Fragment>
      <Box
        component='div'
        sx={{
          maxWidth: '540px',
          mt: '64px',
          mx: 'auto',
          p: '48px',
          textAlign: 'center',
        }}
      >
        <Typography component='h2' sx={{ my: '16px' }} variant='inherit'>
          ログインする
        </Typography>
        <PasswordAuthForm
          buttonText='ログイン'
          onClickSubmitButton={onClickLoginButton}
        />
        <Box
          component='div'
          display='flex'
          flexDirection='column'
          sx={{ mt: '12px' }}
        >
          <Link href='/resetPassword'>
            <Button sx={{ justifyContent: 'left' }}>
              パスワードを忘れた方はこちら
            </Button>
          </Link>
          <Link href='/signup'>
            <Button sx={{ justifyContent: 'left' }}>新規登録はこちら</Button>
          </Link>
        </Box>

        <Snackbar
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          autoHideDuration={2000}
          open={isOpenSnackbar}
          sx={{ top: { md: 180, sm: 180, xs: 160 } }}
          onClose={handleCloseSnackbar}
        >
          <Alert severity='error'>{snackbarMessage}</Alert>
        </Snackbar>
      </Box>
    </Fragment>
  )
}
