import { AccountCircle, Menu } from '@mui/icons-material'
import { AppBar, Avatar, Box, Drawer, IconButton, MenuItem, Toolbar, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { SideBar } from '../SideBar/SideBar'

export const HeaderLayout = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)

  const onClickMenuButton = useCallback(() => {
    setIsShowSideBar(true)
  }, [])
  const onCloseMenuButton = useCallback(() => {
    setIsShowSideBar(false)
  }, [])

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Box
          display='flex'
          width='100%'
          flexDirection='row'
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box display='flex' sx={{ alignItems: 'center' }}>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={onClickMenuButton}>
              <Menu />
            </IconButton>
            <Drawer anchor='left' open={isShowSideBar} onClose={onCloseMenuButton}>
              <Box sx={{ px: '16px' }}>
                <SideBar />
              </Box>
            </Drawer>
            <Typography>Qmatta</Typography>
          </Box>
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
