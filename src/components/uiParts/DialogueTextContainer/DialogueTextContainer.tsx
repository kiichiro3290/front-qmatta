import { Box, Typography } from '@mui/material'
import { lightTheme } from '~/theme'

type DialogueTextContainerProps = {
  dialogue: string
}

export const DialogueTextContainer: React.FC<DialogueTextContainerProps> = ({
  dialogue,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: lightTheme.palette.grey[100],
        borderRadius: '16px',
        my: lightTheme.spacing(2),
        px: lightTheme.spacing(2),
        py: lightTheme.spacing(2),
      }}
    >
      <Typography variant='inherit'>{dialogue}</Typography>
    </Box>
  )
}
