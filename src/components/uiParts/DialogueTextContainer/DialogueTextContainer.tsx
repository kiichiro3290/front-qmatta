import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type DialogueTextContainerProps = {
  dialogue: string
}

export const DialogueTextContainer: React.FC<DialogueTextContainerProps> = ({
  dialogue,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: '16px',
        my: theme.spacing(1),
        px: theme.spacing(2),
        py: theme.spacing(1.5),
        width: '100%',
      }}
    >
      <Typography variant='inherit'>{dialogue}</Typography>
    </Box>
  )
}
