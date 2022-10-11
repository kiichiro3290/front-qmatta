import { DialogueTextContainer } from '~/components/uiParts/DialogueTextContainer/DialogueTextContainer'
import { lightTheme } from '~/theme'

import { Box, Divider, Typography } from '@mui/material'
import { Fragment } from 'react'

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

      <Typography sx={{ pt: lightTheme.spacing(2) }} variant='h5'>
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
