import { lightTheme } from '~/theme'

import { Box } from '@mui/material'

type BearChatBalloonProps = {
  qmaMessage: string
}
export const BearChatBalloon: React.FC<BearChatBalloonProps> = ({
  qmaMessage,
}) => {
  return (
    <Box
      sx={[
        {
          '&::before': {
            border: '36px solid transparent',
            borderLeft: `80px solid ${lightTheme.palette.background.paper}`,
            content: '""',
            display: 'block',
            left: { sm: '64%', xs: '24%' },
            position: 'absolute',
            top: '88%',
            transform: 'rotate(50deg)',
          },
          backgroundColor: lightTheme.palette.background.paper,
          borderRadius: '4px',
          display: 'block',
          filter: `drop-shadow(0px 2px 2px ${lightTheme.palette.grey[400]})`,
          height: '120px',
          p: lightTheme.spacing(3),
          position: 'absolute',
          width: '280px',
          zIndex: lightTheme.zIndex.speedDial,
        },
        {
          left: {
            lg: lightTheme.spacing(20),
            md: lightTheme.spacing(8),
            xs: lightTheme.spacing(2),
          },
        },
        {
          boxShadow: `1px 0px 10px ${lightTheme.palette.grey[400]}`,
        },
      ]}
    >
      {qmaMessage}
    </Box>
  )
}
