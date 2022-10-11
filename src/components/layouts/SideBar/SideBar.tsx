import { Add, ImageOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

export type SideBarProps = {
  communityList: string[]
}

export const SideBar: React.FC<SideBarProps> = ({ communityList }) => {
  const router = useRouter()

  const onClickQmaButton = useCallback(() => {
    router.push('/')
  }, [])
  const onClickWorkspaceButton = useCallback((communityId: string) => {
    router.push(`/communities/${communityId}`)
  }, [])
  return (
    <Box
      sx={{
        height: '100vh',
        margin: '0 auto',
        maxWidth: '320px',
        pt: '96px',
        px: '16px',
        width: '80%',
      }}
    >
      <Typography sx={{ fontWeight: 'bold', my: '16px' }} variant='h5'>
        TOP
      </Typography>

      <Button
        color='primary'
        sx={{ mb: '24px', mt: '8px' }}
        variant='contained'
        fullWidth
        onClick={onClickQmaButton}
      >
        クマに話しかける
      </Button>

      <Typography sx={{ fontWeight: 'bold', my: '16px' }} variant='h5'>
        ワークスペース
      </Typography>

      <Divider />

      <MenuList sx={{ my: '20px' }}>
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
        <MenuItem>
          <Avatar>
            <Add />
          </Avatar>
          <ListItemText primary={'追加する'} sx={{ ml: '16px' }} />
        </MenuItem>
      </MenuList>
    </Box>
  )
}
