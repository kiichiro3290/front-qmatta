import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'
import { Fragment, useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// yup でバリデーションを行うためのスキーマ
const signUpSchema = yup.object({
  email: yup
    .string()
    .email('無効なメールアドレスです。')
    .required('メールアドレスは必須項目です。'),
  password: yup
    .string()
    .required('パスワードは必須項目です。')
    .min(7, 'パスワードは７文字以上で入力してください。')
    .matches(/^[A-Za-z0-9]*$/, 'パスワードは半角英数字で入力してください。'),
})

type Inputs = yup.InferType<typeof signUpSchema>

export type PasswordAuthFormProps = {
  onClickSubmitButton: (email: string, password: string) => void
  buttonText: string
}

export const PasswordAuthForm: React.FC<PasswordAuthFormProps> = ({
  buttonText,
  onClickSubmitButton,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(signUpSchema),
  })
  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data: Inputs) => {
    onClickSubmitButton(data.email, data.password)
  }, [])

  return (
    <Fragment>
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              error={fieldState.error !== undefined}
              helperText={fieldState.error?.message}
              label='メールアドレス'
              sx={{
                '& .MuiFormHelperText-root': {
                  bgcolor: 'background.default',
                  m: 0,
                  pt: 1,
                  px: 1,
                },
                bgcolor: 'white',
                my: '16px',
              }}
              type='text'
              fullWidth
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field, fieldState }) => (
            <FormControl
              error={fieldState.error != undefined}
              sx={{ bgcolor: 'background.default', my: '16px' }}
              variant='outlined'
              fullWidth
            >
              <InputLabel>{'パスワード'}</InputLabel>
              <OutlinedInput
                fullWidth
                {...field}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={() => setShowPassword((state) => !state)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label='パスワード'
                sx={{ bgcolor: 'white' }}
                type={showPassword ? 'text' : 'password'}
              />
              <FormHelperText>
                {fieldState.error != undefined
                  ? fieldState.error?.message
                  : '半角英数字の組み合わせで入力してください。'}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button type='submit' variant='contained' fullWidth>
          {buttonText}
        </Button>
      </Box>
    </Fragment>
  )
}
