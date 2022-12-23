import { BasicModal } from '../BasicModal/BasicModal'

import { selectTheme } from '~/store/theme/themeSlice'

import { Typography, TextField, Button } from '@mui/material'
import { useSelector } from 'react-redux'

type RegisterCommunityModalProps = {
  openRegisterCommunityModal: boolean
  onCloseRegisterCommunityModal: () => void
  communityId: string
  setCommunityId: (value: string) => void
  onRegisterCommunity: (communityId: string) => void
}
export const RegisterCommunityModal: React.FC<RegisterCommunityModalProps> = ({
  openRegisterCommunityModal,
  onCloseRegisterCommunityModal,
  communityId,
  setCommunityId,
  onRegisterCommunity,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <BasicModal
      open={openRegisterCommunityModal}
      onClose={onCloseRegisterCommunityModal}
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
    </BasicModal>
  )
}
