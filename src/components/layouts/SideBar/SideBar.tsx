import { createCommunity, registerCommunity } from '~/api/client/back/community'
import { selectTheme } from '~/store/theme/themeSlice'

import { Add, Close, ImageOutlined, Upload } from '@mui/icons-material'
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
  Modal,
  TextField,
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

  const onClickQmaButton = useCallback(() => {
    router.push('/')
    closeSideBar()
  }, [])

  const onClickWorkspaceButton = useCallback((communityId: string) => {
    router.push(`${communityId}`)
    closeSideBar()
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openCommunityRegistorModal, setOpenCommunityRegistorModal] =
    useState<boolean>(false)
  const [openCommunityCreateModal, setOpenCommunityCreateModal] =
    useState<boolean>(false)
  const [communityId, setCommunityId] = useState<string>('')
  const [communityName, setCommunityName] = useState<string>('')
  const [iconImg, setIconImg] = useState<string>('')
  const [preview, setPreview] = useState<string | ArrayBuffer>('')

  const open = Boolean(anchorEl)
  const handleClickCommunityMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseCommunityMenu = () => {
    setAnchorEl(null)
  }

  const handleCloseCommunityRegistorModal = () =>
    setOpenCommunityRegistorModal(false)

  const handleCloseCommunityCreateModal = () =>
    setOpenCommunityCreateModal(false)

  const onClickCreateCommunity = () => {
    // closeSideBar()
    setAnchorEl(null)
    setOpenCommunityCreateModal(true)
  }

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
          setIconImg(data)
        }
      }
      reader.readAsDataURL(file)
    } else {
      setIconImg('')
    }
  }

  const onClickRegisterCommunity = () => {
    setAnchorEl(null)
    setOpenCommunityRegistorModal(true)
  }

  const onRegisterCommunity = async (communityId: string) => {
    const res = await registerCommunity(communityId)
    setOpenCommunityRegistorModal(false)
    if (!res.error && res.communityName) {
      closeSideBar()
      location.reload()
    } else {
      console.log(res.errorMessage)
    }
  }

  const onCreateCommunity = async (communityName: string, icon: string) => {
    const res = await createCommunity(communityName, icon)
    console.log(res)
    setOpenCommunityCreateModal(false)
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
          onClick={(e) => handleClickCommunityMenu(e)}
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
          <MenuItem onClick={onClickRegisterCommunity}>
            コミュニティに参加する
          </MenuItem>
          <MenuItem onClick={onClickCreateCommunity}>
            コミュニティを新規作成する
          </MenuItem>
        </Menu>
      </MenuList>

      <Modal
        open={openCommunityRegistorModal}
        sx={{ zIndex: theme.zIndex.modal + 1000 }}
        onClose={handleCloseCommunityRegistorModal}
      >
        <Box
          component='div'
          sx={{
            width: '360px',
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            textAlign: 'center',
            padding: theme.spacing(6),
            borderRadius: theme.spacing(0.5),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography
            component='h2'
            id='modal-modal-title'
            sx={{ mb: theme.spacing(4) }}
            variant='h6'
          >
            コミュニティに参加する
          </Typography>
          <TextField
            label='コミュニティID'
            value={communityId}
            fullWidth
            onChange={(e) => setCommunityId(e.target.value)}
          />
          <Button
            sx={{ mt: theme.spacing(4) }}
            variant='contained'
            fullWidth
            onClick={() => onRegisterCommunity(communityId)}
          >
            参加する
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openCommunityCreateModal}
        sx={{ zIndex: theme.zIndex.modal + 1000 }}
        onClose={handleCloseCommunityCreateModal}
      >
        <Box
          component='div'
          sx={{
            width: '360px',
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            textAlign: 'center',
            padding: theme.spacing(6),
            borderRadius: theme.spacing(0.5),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography
            component='h2'
            id='modal-modal-title'
            sx={{ mb: theme.spacing(4) }}
            variant='h6'
          >
            コミュニティを新規登録する
          </Typography>
          <TextField
            label='コミュニティ名'
            sx={{ mb: theme.spacing(2) }}
            value={communityName}
            fullWidth
            onChange={(e) => setCommunityName(e.target.value)}
          />

          {iconImg && (
            <Box component='div' sx={{ textAlign: 'center' }}>
              <img
                alt='preview'
                height='64px'
                src={preview.toString()}
                width='64px'
              />
            </Box>
          )}
          <Button
            component='label'
            sx={{ my: theme.spacing(2) }}
            variant='outlined'
            fullWidth
          >
            アイコン画像
            <Upload />
            <input
              accept='image/*'
              type='file'
              hidden
              onChange={(e) => uploadImg(e)}
            />
          </Button>

          <Button
            sx={{ mt: theme.spacing(4) }}
            variant='contained'
            fullWidth
            onClick={() => onCreateCommunity(communityName, iconImg)}
          >
            作成する
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}
