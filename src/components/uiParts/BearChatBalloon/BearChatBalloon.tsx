import { selectTheme } from '~/store/theme/themeSlice'

import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

type BearChatBalloonProps = {
  qmaMessage: string
}
export const BearChatBalloon: React.FC<BearChatBalloonProps> = ({
  qmaMessage,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      sx={[
        {
          '&::before': {
            border: '36px solid transparent',
            borderLeft: `80px solid ${theme.palette.background.paper}`,
            content: '""',
            display: 'block',
            left: { sm: '64%', xs: '24%' },
            position: 'absolute',
            top: '88%',
            transform: 'rotate(50deg)',
          },
          backgroundColor: theme.palette.background.paper,
          borderRadius: '4px',
          display: 'block',
          filter: `drop-shadow(0px 2px 2px ${theme.palette.grey[400]})`,
          height: '120px',
          p: theme.spacing(3),
          position: 'absolute',
          width: '280px',
          zIndex: theme.zIndex.speedDial,
        },
        {
          left: {
            lg: theme.spacing(20),
            md: theme.spacing(8),
            xs: theme.spacing(2),
          },
        },
        {
          boxShadow: `1px 0px 10px ${theme.palette.grey[400]}`,
        },
      ]}
    >
      {qmaMessage}
    </Box>
  )
}
