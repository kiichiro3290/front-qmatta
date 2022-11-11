import { SideBar } from '../../layouts/SideBar/SideBar'

import { selectCommunityList } from '~/store/user/userSlice'

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
import { useSelector } from 'react-redux'

export const Header: React.FC = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  // reduxで管理しているstate
  const communityList = useSelector(selectCommunityList)

  const onClickMenuButton = useCallback(() => {
    setIsShowSideBar(true)
  }, [])

  const onCloseMenuButton = useCallback(() => {
    setIsShowSideBar(false)
  }, [])

  const closeSideBar = useCallback(() => {
    setIsShowSideBar(false)
  }, [])

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])
  return (
    <AppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box
          display='flex'
          flexDirection='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          width='100%'
        >
          <Box display='flex' sx={{ alignItems: 'center' }}>
            <IconButton
              aria-label='menu'
              color='inherit'
              edge='start'
              size='large'
              onClick={onClickMenuButton}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor='left'
              open={isShowSideBar}
              sx={{
                '& .MuiDrawer-paper': {
                  boxSizing: 'border-box',
                  width: '320px',
                },
              }}
              onClose={onCloseMenuButton}
            >
              <SideBar
                closeSideBar={closeSideBar}
                communityList={communityList}
              />
            </Drawer>
            <Typography>Qmatta</Typography>
          </Box>
          <Button onClick={() => setOpenDialog(true)}>
            <Avatar />
          </Button>
          <Menu
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
            open={openDialog}
            onClose={handleCloseDialog}
          >
            <Typography sx={{ py: '12px', textAlign: 'center' }}>
              アカウント情報
            </Typography>
            <Divider />
            <MenuItem>
              <Link href='/account'>
                <Button sx={{ color: 'text.primary' }} fullWidth>
                  <Typography color='text.primary' sx={{ mx: '12px' }}>
                    マイページ
                  </Typography>
                </Button>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/login'>
                <Button sx={{ color: 'text.primary' }} fullWidth>
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
