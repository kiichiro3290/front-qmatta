import { baerApi } from '~/api/client/back/bear'
import { DialogueTextContainer } from '~/components/uiParts/DialogueTextContainer/DialogueTextContainer'
import { selectMessageHistory } from '~/store/bear/bearSlice'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Divider, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

export const QmaDialogue = () => {
  const theme = useSelector(selectTheme)
  const messageHistory = useSelector(selectMessageHistory)

  const { data } = useQuery(['bear', 'chatHistory'], baerApi.getChatHistory)

  return (
    <Fragment>
      {messageHistory &&
        messageHistory.map((message, index) => (
          <Box key={index} component='div'>
            <DialogueTextContainer dialogue={message.text} />
          </Box>
        ))}

      <Divider sx={{ mt: theme.spacing(2) }} />

      <Typography
        sx={{ pt: theme.spacing(2), mb: theme.spacing(1) }}
        variant='h5'
      >
        過去の会話
      </Typography>

      {data &&
        data.map((chat, id) => (
          <Box key={id} component='div'>
            <DialogueTextContainer dialogue={chat.text} />
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              variant='body2'
            >
              {new Date(chat.date).toLocaleTimeString('ja-JP').toString()}
            </Typography>
          </Box>
        ))}
    </Fragment>
  )
}
