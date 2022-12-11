import { selectTheme } from '~/store/theme/themeSlice'

import { Add, Close, ImageOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

export type SideBarProps = {
  communityList: string[]
  closeSideBar: () => void
}

export const SideBar: React.FC<SideBarProps> = ({
  communityList,
  closeSideBar,
}) => {
  const router = useRouter()
  const theme = useSelector(selectTheme)

  const onClickQmaButton = useCallback(() => {
    router.push('/')
    closeSideBar()
  }, [])

  const onClickWorkspaceButton = useCallback((communityId: string) => {
    router.push(`/communities/${communityId}`)
    closeSideBar()
  }, [])

  return (
    <Box
      sx={{
        height: '100vh',
        margin: '0 auto',
        maxWidth: '320px',
        pt: theme.spacing(8),
        px: theme.spacing(2),
      }}
    >
      <Box
        sx={{
          textAlign: 'end',
          position: 'absolute',
          right: theme.spacing(2),
          top: theme.spacing(2),
        }}
      >
        <IconButton onClick={closeSideBar}>
          <Close />
        </IconButton>
      </Box>
      <Typography sx={{ my: theme.spacing(2) }} variant='h5'>
        TOP
      </Typography>

      <Button
        color='primary'
        sx={{ mb: theme.spacing(2), mt: theme.spacing(1) }}
        variant='outlined'
        fullWidth
        onClick={onClickQmaButton}
      >
        クマに相談
      </Button>

      <Typography sx={{ my: theme.spacing(2) }} variant='h5'>
        ワークスペース
      </Typography>

      <Divider />

      <MenuList sx={{ my: theme.spacing(2) }}>
        <MenuItem onClick={() => onClickWorkspaceButton('programming')}>
          <ListItemAvatar>
            <Avatar>
              <ImageOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'プログラミング'} />
        </MenuItem>
        {communityList &&
          communityList.map((community) => (
            <MenuItem
              key={community}
              onClick={() => onClickWorkspaceButton(community)}
            >
              <ListItemAvatar>
                <Avatar>
                  <ImageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={community} />
            </MenuItem>
          ))}

        <MenuItem sx={{ my: theme.spacing(1) }}>
          <Avatar>
            <Add />
          </Avatar>
          <ListItemText primary={'追加する'} sx={{ ml: theme.spacing(2) }} />
        </MenuItem>
      </MenuList>
    </Box>
  )
}
