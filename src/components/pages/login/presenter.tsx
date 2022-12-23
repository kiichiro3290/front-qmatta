import { PasswordAuthForm } from '~/components/uiParts/PasswordAuthForm/PasswordAuthForm'
import { selectTheme } from '~/store/theme/themeSlice'

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
  Container,
} from '@mui/material'
import Link from 'next/link'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

export type LogInPagePresenterProps = {
  onClickLoginButton: (email: string, password: string) => void
  isOpenSnackbar: boolean
  handleCloseSnackbar: () => void
  snackbarMessage: string
  isLoading: boolean
}

export const LogInPagePresenter: React.FC<LogInPagePresenterProps> = ({
  handleCloseSnackbar,
  isOpenSnackbar,
  onClickLoginButton,
  snackbarMessage,
  isLoading,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Fragment>
      {isLoading && (
        <Container
          maxWidth='sm'
          sx={{ textAlign: 'center', pt: theme.spacing(12) }}
        >
          <Typography>ログイン中です...</Typography>
          <CircularProgress />
        </Container>
      )}
      {!isLoading && (
        <Container maxWidth='sm' sx={{ pt: theme.spacing(12) }}>
          <Typography
            component='h2'
            sx={{ textAlign: 'center', my: theme.spacing(2) }}
            variant='inherit'
          >
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
            {/* <Link href='/resetPassword'>
            <Button sx={{ justifyContent: 'left' }}>
              パスワードを忘れた方はこちら
            </Button>
          </Link> */}

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
        </Container>
      )}
    </Fragment>
  )
}
