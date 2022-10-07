import { Menu as MenuIcon } from '@mui/icons-material'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { SideBar } from '../SideBar/SideBar'

export type HeaderLayoutProps = {
  communityList: string[]
}

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ communityList }) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const onClickMenuButton = useCallback(() => {
    setIsShowSideBar(true)
  }, [])
  const onCloseMenuButton = useCallback(() => {
    setIsShowSideBar(false)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])
  return (
    <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Box
          display='flex'
          width='100%'
          flexDirection='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box display='flex' sx={{ alignItems: 'center' }}>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={onClickMenuButton}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={isShowSideBar}
              onClose={onCloseMenuButton}
              sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '320px' } }}
            >
              <SideBar communityList={communityList} />
            </Drawer>
            <Typography>Qmatta</Typography>
          </Box>
          <Button onClick={() => setOpenDialog(true)}>
            <Avatar />
          </Button>
          <Menu
            open={openDialog}
            onClose={handleCloseDialog}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          >
            <Typography sx={{ py: '12px', textAlign: 'center' }}>アカウント情報</Typography>
            <Divider />
            <MenuItem>
              <Link href='/account'>
                <Button fullWidth sx={{ color: 'text.primary' }}>
                  <Typography color='text.primary' sx={{ mx: '12px' }}>
                    マイページ
                  </Typography>
                </Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/login'>
                <Button fullWidth sx={{ color: 'text.primary' }}>
                  <Typography color='text.primary' sx={{ mx: '12px' }}>
                    ログイン
                  </Typography>
                </Button>
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
