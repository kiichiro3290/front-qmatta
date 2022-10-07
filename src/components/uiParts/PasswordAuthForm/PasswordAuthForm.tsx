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
import { useCallback, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// yup でバリデーションを行うためのスキーマ
const signUpSchema = yup.object({
  email: yup.string().email('無効なメールアドレスです。').required('メールアドレスは必須項目です。'),
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

export const PasswordAuthForm: React.FC<PasswordAuthFormProps> = ({ buttonText, onClickSubmitButton }) => {
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
    <Box>
      <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              type='text'
              fullWidth
              label='メールアドレス'
              error={fieldState.error !== undefined}
              helperText={fieldState.error?.message}
              sx={{
                '& .MuiFormHelperText-root': { bgcolor: 'background.default', m: 0, pt: 1, px: 1 },
                bgcolor: 'white',
                my: '16px',
              }}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field, fieldState }) => (
            <FormControl
              sx={{ bgcolor: 'background.default', my: '16px' }}
              variant='outlined'
              fullWidth
              error={fieldState.error != undefined}
            >
              <InputLabel>{'パスワード'}</InputLabel>
              <OutlinedInput
                fullWidth
                {...field}
                label='パスワード'
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword((state) => !state)} edge='end'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ bgcolor: 'white' }}
              />
              <FormHelperText>
                {fieldState.error != undefined
                  ? fieldState.error?.message
                  : '半角英数字の組み合わせで入力してください。'}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Button fullWidth variant='contained' type='submit'>
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}
