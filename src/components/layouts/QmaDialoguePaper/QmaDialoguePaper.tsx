import { QmaDialogue } from '../QmaDialogue/QmaDialogue'

import { selectTheme } from '~/store/theme/themeSlice'

import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

type QmaDialoguePaperProps = {
  chatHistory: ChatHistory
}

export const QmaDialoguePaper: React.FC<QmaDialoguePaperProps> = ({
  chatHistory,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        backgroundColor: theme.palette.background.paper,
        py: theme.spacing(4),
        height: '80vh',
        borderRadius: '4px',
        boxShadow: theme.shadows[1],
      }}
    >
      <Box
        component='div'
        sx={{ height: '95%', overflowY: 'scroll', px: theme.spacing(4) }}
      >
        <QmaDialogue chatHistory={chatHistory} />
      </Box>
    </Box>
  )
}
