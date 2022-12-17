import numaIcon from 'public/numa.svg'
import sukkiriIcon from 'public/sukkiri.png'
import { selectTheme } from '~/store/theme/themeSlice'

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Popover,
  Typography,
} from '@mui/material'
import { useSelector } from 'react-redux'

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
  const theme = useSelector(selectTheme)
  return (
    <Popover
      anchorEl={stampAnchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'top',
      }}
      open={openStampPop}
      transformOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={handleCloseStampPop}
    >
      <Box component='div' sx={{ p: theme.spacing(2) }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            pb: theme.spacing(1),
            textAlign: 'center',
          }}
        >
          スタンプ一覧
        </Typography>
        <Divider sx={{ mb: theme.spacing(2) }} />
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
