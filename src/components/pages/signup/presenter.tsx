import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'

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
    <Box>
      <Box
        sx={{
          maxWidth: '540px',
          mt: '64px',
          mx: 'auto',
          p: '48px',
          textAlign: 'center',
        }}
      >
        <Typography variant='inherit' component='h2' sx={{ my: '16px' }}>
          アカウント新規登録
        </Typography>
        <Box>
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
        <PasswordAuthForm
          onClickSubmitButton={onClickSignUpButton}
          buttonText='新規登録する'
        />
      </Box>
    </Box>
  )
}
