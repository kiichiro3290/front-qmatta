import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

import { postQuestion } from '~/api/client/back/question'
import { selectTheme } from '~/store/theme/themeSlice'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography, TextField, Button, Autocomplete } from '@mui/material'
import dynamic from 'next/dynamic'
import { useCallback } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import rehypeSanitize from 'rehype-sanitize'
import * as yup from 'yup'

// yupでバリデーションを行うためのスキーマ
const postQuestionSchema = yup.object({
  category: yup.array().of(yup.string().required()).required(),
  priority: yup.string().required(),
  status: yup.string().required(),
  title: yup.string().required(),
  detail: yup.string().required(),
  image: yup.array().of(yup.string().required()).required(),
})

type Inputs = yup.InferType<typeof postQuestionSchema>

type InputQuestionPaperProps = {
  categoryList: Category[]
  priorityList: Priority[]
  statusList: QuestionStatus[]
  communityId: string
}

export const InputQuestionPaper: React.FC<InputQuestionPaperProps> = ({
  categoryList,
  priorityList,
  statusList,
  communityId,
}) => {
  const theme = useSelector(selectTheme)

  const defaultValues: PostQuestion = {
    title: '',
    image: [] as string[],
    detail: '**CORSエラー出てつらい**',
    category: [] as string[],
    priority: 'なるはや',
    status: '回答募集中',
  }

  // TODO: yupかzodを用いたバリデーション
  const { control, handleSubmit, setValue, getValues } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(postQuestionSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data: Inputs) => {
    await handlePostQuestion(data)
  }, [])

  const handlePostQuestion = async (data: PostQuestion) => {
    const res = await postQuestion(data, communityId)
    if (!res.error && res.questionId) {
      console.log(res.questionId)
    } else {
      console.log(res.errorMessage)
    }
    // 投稿が成功したらリロード→微妙
    // location.reload()
  }

  return (
    <Box
      component='div'
      sx={{
        p: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(0.5),
        boxShadow: theme.shadows[1],
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ mb: theme.spacing(2) }} variant='subtitle1'>
          質問タイトル
        </Typography>
        <Controller
          control={control}
          name='title'
          render={() => (
            <TextField
              placeholder='Leave a title'
              sx={{ mb: theme.spacing(2) }}
              fullWidth
              onChange={(e) => setValue('title', e.target.value)}
            />
          )}
        />
        <Typography sx={{ mb: theme.spacing(2) }} variant='subtitle1'>
          質問内容
        </Typography>
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
          sx={{ display: 'flex', gap: theme.spacing(1), mt: theme.spacing(2) }}
        >
          <Controller
            control={control}
            name='priority'
            render={() => (
              <Autocomplete
                id='priority-list'
                options={priorityList}
                renderInput={(params) => (
                  <TextField {...params} label='優先度' />
                )}
                disablePortal
                fullWidth
                onChange={(event, item) => {
                  // priorityIdを保存する
                  setValue('priority', item?.priorityId ?? '')
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='status'
            render={() => (
              <Autocomplete
                id='status-list'
                options={statusList}
                renderInput={(params) => (
                  <TextField {...params} label='ステータス' />
                )}
                disablePortal
                fullWidth
                onChange={(event, item) => {
                  // statusIdを保存する
                  setValue('status', item?.statusId ?? '')
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='category'
            render={() => (
              <Autocomplete
                id='category-list'
                options={categoryList}
                renderInput={(params) => (
                  <TextField {...params} label='カテゴリー' />
                )}
                disablePortal
                fullWidth
                multiple
                onChange={(event, item) => {
                  // categoryIdの配列を保存する
                  const categoryIds = item.map((i) => i.categoryId)
                  setValue('category', categoryIds)
                }}
              />
            )}
          />
        </Box>
        <Box component='div' sx={{ textAlign: 'end' }}>
          <Button
            sx={{ mt: theme.spacing(2) }}
            type='submit'
            variant='contained'
          >
            質問を投稿する
          </Button>
        </Box>
      </form>
    </Box>
  )
}
