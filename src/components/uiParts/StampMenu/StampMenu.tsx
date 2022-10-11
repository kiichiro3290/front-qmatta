import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
} from '@mui/material'
import { lightTheme } from '~/theme'

import numaIcon from 'public/numa.svg'
import sukkiriIcon from 'public/sukkiri.png'

type StampMenuProps = {
  openStampPop: boolean
  handleCloseStampPop: () => void
  stampAnchorEl: HTMLButtonElement | null
}

export const StampMenu: React.FC<StampMenuProps> = ({
  handleCloseStampPop,
  openStampPop,
  stampAnchorEl,
}) => {
  return (
    <Popover
      open={openStampPop}
      onClose={handleCloseStampPop}
      anchorEl={stampAnchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
    >
      <Box sx={{ p: lightTheme.spacing(2) }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            pb: lightTheme.spacing(1),
            textAlign: 'center',
          }}
        >
          スタンプ一覧
        </Typography>
        <Divider sx={{ mb: lightTheme.spacing(2) }} />
        <IconButton>
          <Avatar src={numaIcon.src} />
        </IconButton>
        <IconButton>
          <Avatar src={sukkiriIcon.src} />
        </IconButton>
      </Box>
    </Popover>
  )
}
