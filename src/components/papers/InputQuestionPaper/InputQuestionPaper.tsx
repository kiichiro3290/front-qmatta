import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography, TextField, Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import rehypeSanitize from 'rehype-sanitize'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

// import '@uiw/react-markdown-preview/markdown.css'

export const InputQuestionPaper: React.FC = () => {
  const theme = useSelector(selectTheme)
  const [markdownValue, setMarkdownValue] =
    useState<string>('**Hello world!!!**')

  return (
    <Box
      component='div'
      sx={{
        p: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: '3px',
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography sx={{ mb: theme.spacing(2) }} variant='subtitle1'>
        質問タイトル
      </Typography>
      <TextField
        placeholder='Leave a title'
        sx={{ mb: theme.spacing(2) }}
        fullWidth
      />
      <Typography sx={{ mb: theme.spacing(2) }} variant='subtitle1'>
        質問内容
      </Typography>
      <MDEditor
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        value={markdownValue}
        onChange={(e) => setMarkdownValue(e!)}
      />
      {/* <MDEditor.Markdown
        source={markdownValue}
        style={{ whiteSpace: 'pre-wrap' }}
      /> */}
      {/* <TextField
        placeholder='Leave a comment'
        rows={8}
        sx={{
          maxHeight: '400px',
          mb: theme.spacing(4),
          minHeight: '200px',
          overflow: 'scroll',
        }}
        fullWidth
        multiline
      /> */}
      <Button variant='outlined' fullWidth>
        質問を投稿する
      </Button>
    </Box>
  )
}
