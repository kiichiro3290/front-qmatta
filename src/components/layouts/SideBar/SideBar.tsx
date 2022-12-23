import { createCommunity, registerCommunity } from '~/api/client/back/community'
import { useCreateCommunityModal } from '~/components/hooks/useCreateCommunityModal'
import { useRegisterCommunityModal } from '~/components/hooks/useRegisterCommunityModal'
import { CreateCommunityModal } from '~/components/uiParts/Modal/CreateCommunityModal/CreateCommunityModal'
import { RegisterCommunityModal } from '~/components/uiParts/Modal/RegisterCommunityModal/RegisterCommunityModal'
import { selectTheme } from '~/store/theme/themeSlice'

import { Add, Close, ImageOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

export type SideBarProps = {
  communityList: Community[]
  closeSideBar: () => void
}

export const SideBar: React.FC<SideBarProps> = ({
  communityList,
  closeSideBar,
}) => {
  const router = useRouter()
  const theme = useSelector(selectTheme)

  // コミュニティ作成モーダルの制御
  const {
    openCreateCommunityModal,
    setOpenCreateCommunityModal,
    communityName,
    setCommunityName,
    iconImg,
    preview,
    uploadImg,
    handleCloseCreateCommunityModal,
  } = useCreateCommunityModal()

  // コミュニティ登録モーダルの制御
  const {
    openRegisterCommunityModal,
    handleCloseRegisterCommunityModal,
    communityId,
    setCommunityId,
    setOpenRegisterCommunityModal,
  } = useRegisterCommunityModal()

  // ページ遷移
  const onClickQmaButton = useCallback(() => {
    router.push('/')
    closeSideBar()
  }, [])

  const onClickWorkspaceButton = useCallback((communityId: string) => {
    router.push(`/${communityId}`)
    closeSideBar()
  }, [])

  // サイドバーのメニューを押した時に出てくるポップアップメニュ-の制御
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClickCommunityMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)

  const onClickCreateCommunityMenu = () => {
    setAnchorEl(null)
    setOpenCreateCommunityModal(true)
  }

  const onClickRegisterCommunityMenu = () => {
    setAnchorEl(null)
    setOpenRegisterCommunityModal(true)
  }

  const handleCloseCommunityMenu = () => {
    setAnchorEl(null)
  }

  // コミュニティの登録
  const onRegisterCommunity = async (communityId: string) => {
    const res = await registerCommunity(communityId)
    setOpenRegisterCommunityModal(false)
    if (!res.error && res.communityName) {
      closeSideBar()
      location.reload()
    } else {
      console.log(res.errorMessage)
    }
  }

  // コミュニティの新規作成
  const onCreateCommunity = async (communityName: string, icon: string) => {
    const res = await createCommunity(communityName, icon)
    console.log(res)
    setOpenCreateCommunityModal(false)
    closeSideBar()
  }

  return (
    <Box
      component='div'
      sx={{
        height: '100vh',
        margin: '0 auto',
        maxWidth: '320px',
        pt: theme.spacing(8),
        px: theme.spacing(2),
      }}
    >
      <Box
        component='div'
        sx={{
          textAlign: 'end',
          position: 'absolute',
          right: theme.spacing(2),
          top: theme.spacing(2),
        }}
      >
        <IconButton onClick={closeSideBar}>
          <Close />
        </IconButton>
      </Box>
      <Typography sx={{ my: theme.spacing(2) }} variant='h5'>
        TOP
      </Typography>

      <Button
        color='primary'
        sx={{ mb: theme.spacing(2), mt: theme.spacing(1) }}
        variant='outlined'
        fullWidth
        onClick={onClickQmaButton}
      >
        クマに相談
      </Button>

      <Typography sx={{ my: theme.spacing(2) }} variant='h5'>
        ワークスペース
      </Typography>

      <Divider />

      <MenuList sx={{ my: theme.spacing(2) }}>
        <MenuItem onClick={() => onClickWorkspaceButton('programming')}>
          <ListItemAvatar>
            <Avatar>
              <ImageOutlined />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={'Qmattaコミュニティ'} />
        </MenuItem>

        {communityList &&
          communityList.map((community) => (
            <MenuItem
              key={community.communityId}
              onClick={() => onClickWorkspaceButton(community.communityId)}
            >
              <ListItemAvatar>
                <Avatar src={'data:image/png;base64,' + community.icon}>
                  <ImageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={community.communityName} />
            </MenuItem>
          ))}

        <MenuItem
          sx={{ my: theme.spacing(1) }}
          onClick={handleClickCommunityMenu}
        >
          <Avatar>
            <Add />
          </Avatar>
          <ListItemText primary={'追加する'} sx={{ ml: theme.spacing(2) }} />
        </MenuItem>
        <Menu
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorEl={anchorEl}
          id='community-menu'
          open={open}
          onClose={handleCloseCommunityMenu}
        >
          <MenuItem onClick={onClickRegisterCommunityMenu}>
            コミュニティに参加する
          </MenuItem>
          <MenuItem onClick={onClickCreateCommunityMenu}>
            コミュニティを新規作成する
          </MenuItem>
        </Menu>
      </MenuList>

      <RegisterCommunityModal
        communityId={communityId}
        openRegisterCommunityModal={openRegisterCommunityModal}
        setCommunityId={setCommunityId}
        onCloseRegisterCommunityModal={handleCloseRegisterCommunityModal}
        onRegisterCommunity={onRegisterCommunity}
      />

      <CreateCommunityModal
        communityName={communityName}
        iconImg={iconImg}
        openCreateCommunityModal={openCreateCommunityModal}
        preview={preview}
        setCommunityName={setCommunityName}
        uploadImg={uploadImg}
        onCloseCreateCommunityModal={handleCloseCreateCommunityModal}
        onCreateCommunity={onCreateCommunity}
      />
    </Box>
  )
}
