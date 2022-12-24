const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

import { postAnswer } from '~/api/client/back/question'
import { selectTheme } from '~/store/theme/themeSlice'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Container,
  FormHelperText,
  Typography,
} from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import rehypeSanitize from 'rehype-sanitize'
import * as yup from 'yup'

type QuestionPagePresenterProps = {
  questionHistory: QuestionHistory
  questionId: string
}

export const QuestionPagePresenter: React.FC<QuestionPagePresenterProps> = ({
  questionHistory,
  questionId,
}) => {
  const theme = useSelector(selectTheme)

  const postAnswerSchema = yup.object({
    contents: yup.string().required().default(''),
    images: yup.array().of(yup.string()).default(undefined),
  })

  type Inputs = yup.InferType<typeof postAnswerSchema>

  const { control, handleSubmit, setValue, getValues, reset } = useForm<Inputs>(
    {
      mode: 'onChange',
      resolver: yupResolver(postAnswerSchema),
    }
  )

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data: Inputs) => {
    const body: PostAnswer = {
      detail: data.contents,
      // TODO: 画像のアップロード
      image: [] as string[],
    }
    await handlePostAnswer(body)
    reset()
  }, [])

  const handlePostAnswer = async (data: PostAnswer) => {
    const res = await postAnswer(questionId, data)
    if (!res.error && res.answerId) {
      // console.log(res.questionId)
    } else {
      console.log(res.errorMessage)
    }
  }

  return (
    <>
      <Container maxWidth='lg'>
        <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
          質問
        </Typography>

        {questionHistory && (
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(3),
            }}
          >
            <Box
              component='div'
              sx={{
                p: theme.spacing(2),
                backgroundColor: theme.palette.background.paper,
                borderRadius: theme.spacing(0.5),
                boxShadow: theme.shadows[1],
              }}
            >
              <Typography sx={{ mb: theme.spacing(2) }}>
                質問者：{questionHistory.question.questioner}
              </Typography>
              <MDEditor
                hideToolbar={true}
                preview='preview'
                value={questionHistory.question.details}
              />
            </Box>

            {/** 今までの回答表示 */}
            {questionHistory.answers && (
              <>
                {questionHistory.answers.map((answer) => (
                  <Box
                    key={answer.answerId}
                    component='div'
                    sx={{
                      p: theme.spacing(2),
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: theme.spacing(0.5),
                      boxShadow: theme.shadows[1],
                    }}
                  >
                    <Typography sx={{ mb: theme.spacing(2) }}>
                      質問者：{answer.respondent}
                    </Typography>
                    <MDEditor
                      hideToolbar={true}
                      preview='preview'
                      value={answer.detail}
                    />
                  </Box>
                ))}
              </>
            )}
          </Box>
        )}

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name='contents'
              render={({ field, fieldState }) => (
                <>
                  <MDEditor
                    height='400px'
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}
                    textareaProps={{
                      placeholder: '質問内容を入力',
                    }}
                    value={getValues('contents')}
                    onChange={(value) => {
                      setValue('contents', value as string)
                    }}
                  />
                  <FormHelperText
                    {...field}
                    error={fieldState.error !== undefined}
                  >
                    {fieldState.error ? '回答を入力してください。' : ''}
                  </FormHelperText>
                </>
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
