import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type DialogueTextContainerProps = {
  dialogue: string
  isBear: boolean
}

export const DialogueTextContainer: React.FC<DialogueTextContainerProps> = ({
  dialogue,
  isBear,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      component='div'
      sx={{
        backgroundColor: theme.palette.background.default,
        borderRadius: '16px',
        my: theme.spacing(2),
        px: theme.spacing(2),
        py: theme.spacing(1.5),
        width: '100%',
      }}
    >
      <Typography variant='inherit'>
        {isBear ? 'bear：' : 'you：'}
        {dialogue}
      </Typography>
    </Box>
  )
}
