import { ImageOutlined } from '@mui/icons-material'
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
  // Todo
}

export const SideBar: React.FC<SideBarProps> = () => {
  const router = useRouter()

  const onClickQmaButton = useCallback(() => {
    router.push('/')
  }, [])
  const onClickWorkspaceButton = useCallback((workspaceId: string) => {
    router.push(`/workspace/${workspaceId}`)
  }, [])
  const workspaces = [
    { id: 'python', name: 'python', photo: 'url' },
    { id: 'go', name: 'Go', photo: 'url' },
    { id: 'flutter', name: 'Flutter', photo: 'url' },
  ]
  return (
    <Box sx={{ height: '100vh', margin: '0 auto', maxWidth: '320px', pt: '96px', px: '16px', width: '80%' }}>
      <Button fullWidth variant='contained' color='secondary' sx={{ my: '8px' }} onClick={onClickQmaButton}>
        クマに話しかける
      </Button>

      <Typography variant='h5' sx={{ fontWeight: 'bold', my: '16px' }}>
        ワークスペース
      </Typography>

      <Divider />

      <MenuList sx={{ my: '16px' }}>
        {workspaces.map((workspace) => (
          <MenuItem key={workspace.id} onClick={() => onClickWorkspaceButton(workspace.id)}>
            <ListItemAvatar>
              <Avatar>
                <ImageOutlined />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={workspace.name} />
          </MenuItem>
        ))}
      </MenuList>
      <Button fullWidth variant='contained' sx={{ my: '24px' }}>
        ワークスペースを追加
      </Button>

      <Divider />

      {/* <MenuList>
        <MenuItem sx={{ my: '16px' }}>
          <ListItemIcon>
            <Cloud fontSize='small' />
          </ListItemIcon>
          <ListItemText>Web Clipboard</ListItemText>
        </MenuItem>
      </MenuList> */}
    </Box>
  )
}
