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

/**
 * yup
 * https://connectedpapers.com
 * form
 * https://zenn.dev/vacatono/articles/647c06eaa6f436
 */

const categoryArraySchema = yup.object({
  categoryId: yup.string().required(),
  label: yup.string().required(),
})

// yupでバリデーションを行うためのスキーマ
const postQuestionSchema = yup.object({
  categoryArray: yup
    .array()
    .of(categoryArraySchema)
    .min(1)
    .required('カテゴリーが選択されていません。')
    .default([]),
  priority: yup
    .object({
      priorityId: yup
        .string()
        .required('優先度が選択されていません。')
        .default(''),
      label: yup.string().required('優先度が選択されていません。').default(''),
    })
    .required('優先度が選択されていません。'),
  status: yup
    .object({
      statusId: yup.string().required().default(''),
      label: yup.string().required().default(''),
    })
    .required('ステータスが選択されていません。'),
  title: yup.string().required('タイトルが入力されていません。').default(''),
  detail: yup.string().required('質問内容が入力されていません').default(''),
  image: yup.array().of(yup.string()).default(undefined),
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

  const defaultValues: PostQuestionInput = {
    title: '',
    image: [] as string[],
    detail: '',
    categoryArray: [],
    priority: { label: '', priorityId: '' },
    status: { label: '', statusId: '' },
  }

  // TODO: yupかzodを用いたバリデーション
  const { control, handleSubmit, setValue, getValues, reset } = useForm<Inputs>(
    {
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(postQuestionSchema),
    }
  )

  const onSubmit: SubmitHandler<Inputs> = useCallback(async (data: Inputs) => {
    const body: PostQuestion = {
      title: data.title,
      detail: data.detail,
      image: data.image ?? [],
      priorityId: data.priority.priorityId,
      statusId: data.status.statusId,
      categoryIdArray: data.categoryArray.map((row) => row.categoryId),
    }
    await handlePostQuestion(body)
    reset()
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
          render={({ field, fieldState }) => (
            <TextField
              error={fieldState.error !== undefined}
              helperText={fieldState.error?.message}
              label='質問タイトル'
              placeholder='Leave a title'
              sx={{ mb: theme.spacing(2) }}
              type='text'
              fullWidth
              {...field}
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
              textareaProps={{
                placeholder: '質問内容を入力',
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
            render={({ field, fieldState }) => (
              <Autocomplete
                id='priority-list'
                inputValue={getValues('priority').label}
                options={priorityList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='優先度'
                    {...field}
                    error={fieldState.error !== undefined}
                    helperText={
                      fieldState.error ? '優先度が選択されていません。' : ''
                    }
                  />
                )}
                disablePortal
                fullWidth
                onChange={(event, item) => {
                  // priorityIdを保存する
                  if (item) setValue('priority', item)
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='status'
            render={({ field, fieldState }) => (
              <Autocomplete
                id='status-list'
                inputValue={getValues('status').label}
                options={statusList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='ステータス'
                    {...field}
                    error={fieldState.error !== undefined}
                    helperText={
                      fieldState.error ? 'ステータスが選択されていません。' : ''
                    }
                  />
                )}
                disablePortal
                fullWidth
                onChange={(event, item) => {
                  // statusIdを保存する
                  if (item) setValue('status', item)
                }}
              />
            )}
          />
          <Controller
            control={control}
            name='categoryArray'
            render={({ field, fieldState }) => (
              <Autocomplete
                id='category-list'
                options={categoryList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='カテゴリー'
                    {...field}
                    error={fieldState.error !== undefined}
                    helperText={
                      fieldState.error
                        ? 'カテゴリーは最低１つ選択してください。'
                        : ''
                    }
                  />
                )}
                value={getValues('categoryArray')}
                disablePortal
                fullWidth
                multiple
                onChange={(event, item) => {
                  // categoryIdの配列を保存する
                  setValue('categoryArray', item)
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
