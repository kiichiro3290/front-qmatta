import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Modal } from '@mui/material'
import { useSelector } from 'react-redux'

type BasicModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export const BasicModal: React.FC<BasicModalProps> = ({
  open,
  onClose,
  children,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <Modal open={open} onClose={onClose}>
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
        {children}
      </Box>
    </Modal>
  )
}
