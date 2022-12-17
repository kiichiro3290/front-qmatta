import { DialogueTextContainer } from '~/components/uiParts/DialogueTextContainer/DialogueTextContainer'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Divider, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

export type QmaDialogueProps = {
  dialogues: string[]
  messageHistory: MessageHistory
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({
  dialogues,
  messageHistory,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Fragment>
      {dialogues.map((dialogue, index) => (
        <Box key={index} component='div'>
          <DialogueTextContainer dialogue={dialogue} />
        </Box>
      ))}

      <Divider sx={{ mt: theme.spacing(2) }} />

      <Typography
        sx={{ pt: theme.spacing(2), mb: theme.spacing(1) }}
        variant='h5'
      >
        過去の会話
      </Typography>

      {messageHistory.messages &&
        messageHistory.messages.map((dialogue, index) => (
          <Box key={index} component='div'>
            <DialogueTextContainer dialogue={dialogue} />
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
              variant='body2'
            >
              {messageHistory.dates[index]
                .toLocaleTimeString('ja-JP')
                .toString()}
            </Typography>
          </Box>
        ))}
    </Fragment>
  )
}
