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
  onCloseSideBar: () => void
}

export const SideBar: React.FC<SideBarProps> = ({ onCloseSideBar }) => {
  const router = useRouter()
  const onClickMyPageButton = useCallback(() => {
    router.push('/account')
    onCloseSideBar()
  }, [])
  const onClickQmaButton = useCallback(() => {
    router.push('/')
    onCloseSideBar()
  }, [])
  const onClickWorkspaceButton = useCallback((workspaceId: string) => {
    router.push(`/record/${workspaceId}`)
    onCloseSideBar()
  }, [])
  const workspaces = [
    { id: 'aaaa', name: 'python', photo: 'url' },
    { id: 'bbbb', name: 'Go', photo: 'url' },
    { id: 'cccc', name: 'Flutter', photo: 'url' },
  ]
  return (
    <Box sx={{ height: '100vh', maxWidth: '100%', pt: '96px', px: '16px', width: 320 }}>
      <Button fullWidth variant='contained' color='secondary' sx={{ my: '8px' }} onClick={onClickQmaButton}>
        クマに相談する
      </Button>
      <Button fullWidth variant='contained' sx={{ my: '8px' }} onClick={onClickMyPageButton}>
        マイページ
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
    </Box>
  )
}
