import { Box, Typography } from '@mui/material'

export type QmaDialogueProps = {
  dialogues: string[]
  // TODO
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({ dialogues }) => {
  return (
    <Box sx={{ px: '16px', width: 400 }}>
      {dialogues.map((dialogue, index) => (
        <Box key={index} sx={{ backgroundColor: 'grey.100', borderRadius: '16px', my: '16px', p: '12px 24px' }}>
          <Typography sx={{ fontSize: '20px' }}>{dialogue}</Typography>
        </Box>
      ))}
    </Box>
  )
}
