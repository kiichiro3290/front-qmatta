import { SideBar } from '../../layouts/SideBar/SideBar'

import { selectTheme } from '~/store/theme/themeSlice'
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
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

export const Header: React.FC = () => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const theme = useSelector(selectTheme)
  // reduxで管理しているstate
  const communityList = useSelector(selectCommunityList)

  const onClickMenuButton = useCallback(() => {
    setIsShowSideBar((val) => !val)
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
      color='transparent'
      position='fixed'
      sx={{
        zIndex: (theme) => theme.zIndex.drawer,
        boxShadow: 'none',
      }}
    >
      <Box
        component='div'
        display='flex'
        flexDirection='row'
        height={theme.spacing(12)}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: theme.spacing(2),
          px: theme.spacing(4),
        }}
        width='100%'
      >
        <Box component='div' sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            aria-label='menu'
            color='inherit'
            size='large'
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: '4px',
              boxShadow: theme.shadows[1],
            }}
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
        </Box>

        <Box
          component='div'
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '4px',
            boxShadow: theme.shadows[1],
            width: '48px',
            height: '48px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
          onClick={() => setOpenDialog(true)}
        >
          <Avatar />
        </Box>

        <AccountMenu
          openDialog={openDialog}
          onCloseDialog={handleCloseDialog}
        />
      </Box>
    </AppBar>
  )
}

type AccountMenuProps = {
  openDialog: boolean
  onCloseDialog: () => void
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  openDialog,
  onCloseDialog,
}) => {
  return (
    <Menu
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      open={openDialog}
      onClose={onCloseDialog}
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
  )
}
