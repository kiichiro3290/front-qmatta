import { Box, Button, Typography } from '@mui/material'

export type QmaDialogueProps = {
  dialogues: string[]
  closeDialogue: () => void
}

export const QmaDialogue: React.FC<QmaDialogueProps> = ({ closeDialogue, dialogues }) => {
  return (
    <Box sx={{ pt: '64px', px: '24px', width: 360 }}>
      {dialogues.map((dialogue, index) => (
        <Typography key={index}>{dialogue}</Typography>
      ))}
      <Box sx={{ bottom: '16px', left: 0, position: 'absolute', px: '16px', width: '100%' }}>
        <Button variant='contained' fullWidth onClick={closeDialogue}>
          閉じる
        </Button>
      </Box>
    </Box>
  )
}
