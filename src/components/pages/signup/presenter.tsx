import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'

import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { Fragment } from 'react'

export type SignUpPagePresenterProps = {
  onClickSignUpButton: (email: string, password: string) => void
  isOpenSnackbar: boolean
  snackbarMessage: string
  handleCloseSnackbar: () => void
}

export const SignUpPagePresenter: React.FC<SignUpPagePresenterProps> = ({
  handleCloseSnackbar,
  isOpenSnackbar,
  onClickSignUpButton,
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
          アカウント新規登録
        </Typography>
        <Fragment>
          <Snackbar
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            autoHideDuration={2000}
            open={isOpenSnackbar}
            sx={{ top: { md: 180, sm: 180, xs: 160 } }}
            onClose={handleCloseSnackbar}
          >
            <Alert severity='error'>{snackbarMessage}</Alert>
          </Snackbar>
        </Fragment>
        <PasswordAuthForm
          buttonText='新規登録する'
          onClickSubmitButton={onClickSignUpButton}
        />
      </Box>
    </Fragment>
  )
}
