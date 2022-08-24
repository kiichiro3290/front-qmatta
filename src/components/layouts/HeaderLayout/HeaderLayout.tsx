import { Menu } from '@mui/icons-material'
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
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
        <Box>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={onClickMenuButton}>
            <Menu />
          </IconButton>
          <Drawer anchor='left' open={isShowSideBar} onClose={onCloseMenuButton}>
            <Box sx={{ px: '16px' }}>
              <SideBar onCloseSideBar={onCloseMenuButton} />
            </Box>
          </Drawer>
        </Box>
        <Typography>Qmatta</Typography>
      </Toolbar>
    </AppBar>
  )
}
