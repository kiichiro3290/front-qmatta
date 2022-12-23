import { BasicModal } from '../BasicModal/BasicModal'

import { selectTheme } from '~/store/theme/themeSlice'

import { Upload } from '@mui/icons-material'
import { Typography, TextField, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'

type CreateCommunityModalProps = {
  openCreateCommunityModal: boolean
  onCloseCreateCommunityModal: () => void
  setCommunityName: (val: string) => void
  preview: string | ArrayBuffer
  uploadImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCreateCommunity: (communityName: string, iconImg: string) => void
  communityName: string
  iconImg: string
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  openCreateCommunityModal,
  onCloseCreateCommunityModal,
  setCommunityName,
  iconImg,
  preview,
  uploadImg,
  onCreateCommunity,
  communityName,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <BasicModal
      open={openCreateCommunityModal}
      onClose={onCloseCreateCommunityModal}
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
    </BasicModal>
  )
}
