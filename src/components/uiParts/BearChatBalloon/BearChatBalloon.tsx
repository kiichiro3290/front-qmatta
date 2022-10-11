import { Box } from '@mui/material'
import { lightTheme } from '~/theme'

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
            left: '64%',
            position: 'absolute',
            top: '88%',
            transform: 'rotate(50deg)',
          },
          backgroundColor: lightTheme.palette.background.paper,
          borderRadius: '4px',
          display: 'block',
          filter: `drop-shadow(0px 2px 2px ${lightTheme.palette.grey[400]})`,
          height: '120px',
          left: 0,
          p: '12px',
          position: 'absolute',
          width: '280px',
          zIndex: lightTheme.zIndex.speedDial,
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
