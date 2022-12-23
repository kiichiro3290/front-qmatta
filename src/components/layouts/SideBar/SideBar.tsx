import { registerCommunity } from '~/api/client/back/community'
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
    router.push(`/communities/${communityId}`)
    closeSideBar()
  }, [])

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openCommunityRegistorModal, setOpenCommunityRegistorModal] =
    useState<boolean>(false)
  const [openCommunityCreateModal, setOpenCommunityCreateModal] =
    useState<boolean>(false)
  const [communityId, setCommunityId] = useState<string>('')
  const [communityName, setCommunityName] = useState<string>('')
  const [icon, setIcon] = useState<string>('')

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

  const onClickRegisterCommunity = () => {
    // closeSideBar()
    setAnchorEl(null)
    setOpenCommunityRegistorModal(true)
  }

  const onRegisterCommunity = async (communityId: string) => {
    const res = await registerCommunity(communityId)
    setOpenCommunityRegistorModal(false)
    if (!res.error && res.communityName) {
      console.log(res.communityName)
    } else {
      console.log(res.errorMessage)
    }
  }

  const onCreateCommunity = async (communityName: string, icon: string) => {
    console.log(communityName, icon)
    setOpenCommunityCreateModal(false)
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
                <Avatar>
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
          <TextField
            label='アイコン'
            value={icon}
            fullWidth
            onChange={(e) => setIcon(e.target.value)}
          />
          <Button
            sx={{ mt: theme.spacing(4) }}
            variant='contained'
            fullWidth
            onClick={() => onCreateCommunity(communityName, icon)}
          >
            作成する
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

type CommunityMenuModalProps = {
  openModal: boolean
  handleModal: () => void
}
export const CommunityMenuModal: React.FC<CommunityMenuModalProps> = ({
  openModal,
  handleModal,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <>
      <Modal open={openModal} onClose={handleModal}>
        <Box
          component='div'
          sx={{
            width: '320px',
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            textAlign: 'center',
            padding: theme.spacing(8),
            borderRadius: theme.spacing(0.5),
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography component='h2' id='modal-modal-title' variant='h6'>
            コミュニティのIDを入力
          </Typography>
          <Button>参加する</Button>
        </Box>
      </Modal>
    </>
  )
}
