import { Box, Typography } from '@mui/material'

export type QmaDialogueProps = {
  dialogues: string[]
  // TODO
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({ dialogues }) => {
  return (
    <Box sx={{ pt: '64px', px: '12px', width: 480 }}>
      {dialogues.map((dialogue, index) => (
        <Typography key={index}>{dialogue}</Typography>
      ))}
    </Box>
  )
}
