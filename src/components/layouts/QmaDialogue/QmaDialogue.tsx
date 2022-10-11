import { Box, Divider, Typography } from '@mui/material'
import { Fragment } from 'react'
import { DialogueTextContainer } from '~/components/uiParts/DialogueTextContainer/DialogueTextContainer'
import { lightTheme } from '~/theme'

export type QmaDialogueProps = {
  dialogues: string[]
  messageHistory: string[]
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({
  dialogues,
  messageHistory,
}) => {
  return (
    <Box
      sx={{ px: lightTheme.spacing(2), width: { sm: '400px', xs: '280px' } }}
    >
      {dialogues.map((dialogue, index) => (
        <Fragment key={index}>
          <DialogueTextContainer dialogue={dialogue} />
        </Fragment>
      ))}

      <Divider sx={{ mt: lightTheme.spacing(2) }} />

      <Typography variant='h5' sx={{ pt: lightTheme.spacing(2) }}>
        過去の会話
      </Typography>

      {messageHistory &&
        messageHistory.map((dialogue, index) => (
          <Fragment key={index}>
            <DialogueTextContainer dialogue={dialogue} />
          </Fragment>
        ))}
    </Box>
  )
}
