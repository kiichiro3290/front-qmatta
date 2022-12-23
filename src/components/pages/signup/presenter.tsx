import { SnackbarInfoType } from '.'

import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'
import { selectTheme } from '~/store/theme/themeSlice'

import { Alert, Container, Snackbar, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

export type SignUpPagePresenterProps = {
  onClickSignUpButton: (email: string, password: string) => void
  isOpenSnackbar: boolean
  snackbarInfo: SnackbarInfoType
  handleCloseSnackbar: () => void
}

export const SignUpPagePresenter: React.FC<SignUpPagePresenterProps> = ({
  handleCloseSnackbar,
  isOpenSnackbar,
  onClickSignUpButton,
  snackbarInfo,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Fragment>
      <Container maxWidth='xs' sx={{ pt: theme.spacing(12) }}>
        <Typography
          component='h2'
          sx={{ textAlign: 'center', my: theme.spacing(2) }}
          variant='inherit'
        >
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
            <Alert severity={snackbarInfo.type}>{snackbarInfo.message}</Alert>
          </Snackbar>
        </Fragment>
        <PasswordAuthForm
          buttonText='新規登録する'
          onClickSubmitButton={onClickSignUpButton}
        />
      </Container>
    </Fragment>
  )
}
