import { Box, Typography } from '@mui/material'

export type QmaDialogueProps = {
  dialogues: string[]
  messageHistory: string[]
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({ dialogues, messageHistory }) => {
  return (
    <Box sx={{ px: '20px', width: '400px' }}>
      {dialogues.map((dialogue, index) => (
        <Box key={index} sx={{ backgroundColor: 'grey.100', borderRadius: '16px', my: '20px', p: '12px 24px' }}>
          <Typography sx={{ fontSize: '16px' }}>{dialogue}</Typography>
        </Box>
      ))}
      <Typography variant='h5' sx={{ pt: '12px' }}>
        過去の会話
      </Typography>
      {messageHistory &&
        messageHistory.map((dialogue, index) => (
          <Box key={index} sx={{ backgroundColor: 'grey.100', borderRadius: '16px', my: '20px', p: '12px 24px' }}>
            <Typography sx={{ fontSize: '16px' }}>{dialogue}</Typography>
          </Box>
        ))}
    </Box>
  )
}
