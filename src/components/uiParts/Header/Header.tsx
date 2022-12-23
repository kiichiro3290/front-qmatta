import { SideBar } from '../../layouts/SideBar/SideBar'
import { AccountSettingModal } from '../Modal/AccountSettingModal/AccountSettingModal'

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
  const theme = useSelector(selectTheme)
  // アカウント設定モーダルの制御
  const [openAccountSettingModal, setOpenAccountSettingModal] =
    useState<boolean>(false)

  const handleCloseAccountSettingModal = () => setOpenAccountSettingModal(false)
  const onClickAccountSetting = () => setOpenAccountSettingModal(true)

  // アカウント設定変更に必要な入力情報
  const [userName, setUserName] = useState<string>('')
  const [userIconImg, setUserIconImg] = useState<string>('')
  const [preview, setPreview] = useState<string | ArrayBuffer>('')

  // 画像のアップロード
  const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (result) {
          setPreview(result)
          const data = result.toString().split(',')[1]
          setUserIconImg(data)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setUserIconImg('')
    }
  }

  // ユーザ情報の更新
  const updateUserInfo = async () => {
    // TODO: ユーザ名とアイコンの変更
  }

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
        <Button
          sx={{ color: theme.palette.text.secondary }}
          fullWidth
          onClick={onClickAccountSetting}
        >
          <Typography sx={{ mx: '12px' }}>アカウント設定</Typography>
        </Button>
      </MenuItem>
      <MenuItem>
        <Link href='/login'>
          <Button sx={{ color: theme.palette.text.secondary }} fullWidth>
            <Typography sx={{ mx: '12px' }}>ログイン</Typography>
          </Button>
        </Link>
      </MenuItem>
      <MenuItem>
        {/**TODO:ログアウト機能 */}
        <Button sx={{ color: theme.palette.text.secondary }} fullWidth>
          <Typography sx={{ mx: '12px' }}>ログアウト</Typography>
        </Button>
      </MenuItem>

      <AccountSettingModal
        openAccountSettingModal={openAccountSettingModal}
        preview={preview}
        setUserName={setUserName}
        updateUserInfo={updateUserInfo}
        uploadImg={uploadImg}
        userIconImg={userIconImg}
        userName={userName}
        onCloseAccuontSettingModal={handleCloseAccountSettingModal}
      />
    </Menu>
  )
}
