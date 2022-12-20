const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Button, Container, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { Controller, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import rehypeSanitize from 'rehype-sanitize'

const defaultValues: PostAnswer = {
  detail: 'kaitou',
  image: [],
}

export const QuestionPagePresenter: React.FC = () => {
  const theme = useSelector(selectTheme)
  // TODO: yupかzodを用いたバリデーション
  const { control, handleSubmit, setValue, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
  })

  const handlePostAnswer = () => {
    //
  }

  return (
    <>
      <Box component='div' sx={{ height: theme.spacing(8) }} />
      <Container maxWidth='lg'>
        <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
          質問
        </Typography>

        <MDEditor preview='preview' value='### とってきた質問をここに載せる' />

        <Box component='div' sx={{ height: theme.spacing(8) }} />

        <Box
          component='div'
          sx={{
            p: theme.spacing(2),
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(0.5),
            boxShadow: theme.shadows[1],
          }}
        >
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            回答を入力
          </Typography>
          <form onSubmit={handleSubmit(handlePostAnswer)}>
            <Controller
              control={control}
              name='detail'
              render={() => (
                <MDEditor
                  height='400px'
                  previewOptions={{
                    rehypePlugins: [[rehypeSanitize]],
                  }}
                  value={getValues('detail')}
                  onChange={(value) => {
                    setValue('detail', value as string)
                  }}
                />
              )}
            />
            <Box
              component='div'
              sx={{
                mt: theme.spacing(2),
                display: 'flex',
                justifyContent: 'end',
              }}
            >
              <Button type='submit' variant='contained'>
                回答を投稿
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  )
}
