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

type HeaderProps = {
  userIconSrc?: string
}

export const Header: React.FC<HeaderProps> = ({ userIconSrc }) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseAccountMenu = () => {
    setAnchorEl(null)
  }

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
          onClick={handleAccountMenu}
        >
          <Avatar src={userIconSrc} />
        </Box>

        <AccountMenu
          anchorEl={anchorEl as HTMLButtonElement}
          openAccountMenu={open}
          onCloseAccountMenu={handleCloseAccountMenu}
        />
      </Box>
    </AppBar>
  )
}

type AccountMenuProps = {
  openAccountMenu: boolean
  onCloseAccountMenu: () => void
  anchorEl: HTMLButtonElement | null
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  openAccountMenu,
  onCloseAccountMenu,
  anchorEl,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      open={openAccountMenu}
      onClose={onCloseAccountMenu}
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
      <MenuItem>
        {/**TODO:ログアウト機能 */}
        <Button sx={{ color: 'text.primary' }} fullWidth>
          <Typography color='text.primary' sx={{ mx: '12px' }}>
            ログアウト
          </Typography>
        </Button>
      </MenuItem>
    </Menu>
  )
}
