import { selectTheme } from '~/store/theme/themeSlice'

import { IconButton, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type CommunityMenuItemButton = {
  menuTitle: string
  onClickMenuButton: () => void
}

export const CommunityMenuItemButton: React.FC<CommunityMenuItemButton> = ({
  menuTitle,
  onClickMenuButton,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <IconButton
      aria-label='menu'
      color='inherit'
      size='large'
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(0.5),
        boxShadow: theme.shadows[1],
        ml: theme.spacing(2),
      }}
      onClick={onClickMenuButton}
    >
      <Typography>{menuTitle}</Typography>
    </IconButton>
  )
}
