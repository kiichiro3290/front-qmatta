import { Alert, Box, Snackbar, Typography } from '@mui/material'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'
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
  const iconSrc = '/kosenLab.svg'
  return (
    <Box>
      <HeaderLayout communityList={[]} />
      <Box sx={{ maxWidth: '540px', mt: '64px', mx: 'auto', p: '48px', textAlign: 'center' }}>
        <Box
          component='img'
          alt=''
          src={iconSrc}
          sx={{ display: 'block', mb: '36px', mx: 'auto', width: { sm: 200, xs: 140 } }}
        />
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
        <PasswordAuthForm onClickSubmitButton={onClickSignUpButton} buttonText='新規登録する' />
      </Box>
    </Box>
  )
}
