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
  const onClickWorkspaceButton = useCallback((workspaceId: string) => {
    router.push(`/workspace/${workspaceId}`)
  }, [])
  return (
    <Box sx={{ height: '100vh', margin: '0 auto', maxWidth: '320px', pt: '96px', px: '16px', width: '80%' }}>
      <Typography variant='h5' sx={{ fontWeight: 'bold', my: '16px' }}>
        TOP
      </Typography>

      <Button fullWidth variant='contained' color='primary' sx={{ mb: '24px', mt: '8px' }} onClick={onClickQmaButton}>
        クマに話しかける
      </Button>

      <Typography variant='h5' sx={{ fontWeight: 'bold', my: '16px' }}>
        ワークスペース
      </Typography>

      <Divider />

      <MenuList sx={{ my: '20px' }}>
        {communityList &&
          communityList.map((community) => (
            <MenuItem key={community} onClick={() => onClickWorkspaceButton(community)}>
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
