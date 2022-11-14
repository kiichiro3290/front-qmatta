import { QmaDialogue } from '../QmaDialogue/QmaDialogue'

import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type QmaDialoguePaperProps = {
  dialogues: string[]
  messageHistory: MessageHistory
}

export const QmaDialoguePaper: React.FC<QmaDialoguePaperProps> = ({
  dialogues,
  messageHistory,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: theme.spacing(4),
        height: '80vh',
        borderRadius: '4px',
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
        くま記録
      </Typography>
      <Box sx={{ height: '95%', overflowY: 'scroll' }}>
        <QmaDialogue dialogues={dialogues} messageHistory={messageHistory} />
      </Box>
    </Box>
  )
}
