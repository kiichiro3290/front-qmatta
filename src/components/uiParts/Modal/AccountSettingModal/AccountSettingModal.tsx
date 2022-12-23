import { BasicModal } from '../BasicModal/BasicModal'

import { selectTheme } from '~/store/theme/themeSlice'

import { Upload } from '@mui/icons-material'
import { Typography, TextField, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'

type AccountSettingModalProps = {
  openAccountSettingModal: boolean
  onCloseAccuontSettingModal: () => void
  userName: string
  userIconImg: string
  preview: string | ArrayBuffer
  setUserName: (val: string) => void
  updateUserInfo: (userName: string, userIconImg: string) => void
  uploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AccountSettingModal: React.FC<AccountSettingModalProps> = ({
  openAccountSettingModal,
  onCloseAccuontSettingModal,
  userIconImg,
  userName,
  setUserName,
  uploadImg,
  updateUserInfo,
  preview,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <BasicModal
      open={openAccountSettingModal}
      onClose={onCloseAccuontSettingModal}
    >
      <Typography
        component='h2'
        id='modal-modal-title'
        sx={{ mb: theme.spacing(4) }}
        variant='h6'
      >
        アカウント設定
      </Typography>
      <TextField
        label='ユーザ名'
        sx={{ mb: theme.spacing(2) }}
        value={userName}
        fullWidth
        onChange={(e) => setUserName(e.target.value)}
      />

      {userIconImg && (
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
        onClick={() => updateUserInfo(userName, userIconImg)}
      >
        作成する
      </Button>
    </BasicModal>
  )
}
