import { QmaDialogue } from '../QmaDialogue/QmaDialogue'

import { selectTheme } from '~/store/theme/themeSlice'

import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

export type QmaDialogueDrawerProps = {
  chatHistory: ChatHistory
}
export const QmaDialogueDrawer: React.FC<QmaDialogueDrawerProps> = ({
  chatHistory,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{ px: theme.spacing(2), width: { sm: '400px', xs: '280px' } }}
    >
      <QmaDialogue chatHistory={chatHistory} />
    </Box>
  )
}
