import { StampMenu } from '~/components/uiParts/StampMenu/StampMenu'
import { selectTheme } from '~/store/theme/themeSlice'

import { Chat, TagFaces } from '@mui/icons-material'
import { Avatar, Container, IconButton, InputBase } from '@mui/material'
import { ChangeEvent } from 'react'
import { useSelector } from 'react-redux'

export type QmaFooterProps = {
  onKeydown: (e: string) => void
  startComposition: () => void
  endComposition: () => void
  onChangeDialogue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  onClickDialogueButton: () => void
  dialogue: string
  openStampPop: boolean
  handleCloseStampPop: () => void
  handleOpenStampPop: (event: React.MouseEvent<HTMLButtonElement>) => void
  stampAnchorEl: HTMLButtonElement | null
}

export const QmaFooter: React.FC<QmaFooterProps> = ({
  dialogue,
  endComposition,
  handleCloseStampPop,
  handleOpenStampPop,
  onChangeDialogue,
  onClickDialogueButton,
  onKeydown,
  openStampPop,
  stampAnchorEl,
  startComposition,
}) => {
  const theme = useSelector(selectTheme)
  return (
    <Container
      maxWidth='sm'
      sx={{
        bottom: 0,
        left: '50%',
        position: 'fixed',
        transform: 'translate(-50%, 0)',
        zIndex: theme.zIndex.drawer,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: '40px 40px 0px 0px',
        boxShadow: `0px 0px 10px ${theme.palette.grey[400]}`,
        pb: theme.spacing(4),
        pt: theme.spacing(2),
        px: theme.spacing(3),
      }}
    >
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: theme.spacing(2),
        }}
      > */}
      <IconButton
        aria-label='dialogue'
        color='primary'
        onClick={(e) => handleOpenStampPop(e)}
      >
        <Avatar sx={{ bgcolor: 'icon.pink' }}>
          <TagFaces />
        </Avatar>
      </IconButton>

      {/** スタンプボタン */}
      <StampMenu
        handleCloseStampPop={handleCloseStampPop}
        openStampPop={openStampPop}
        stampAnchorEl={stampAnchorEl}
      />

      <IconButton
        aria-label='dialogue'
        color='primary'
        onClick={onClickDialogueButton}
      >
        <Avatar sx={{ bgcolor: 'icon.blue' }}>
          <Chat />
        </Avatar>
      </IconButton>
      {/* </Box> */}

      <InputBase
        placeholder='コンパイル通らない...😂'
        sx={{
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          borderRadius: '4px',
          fontSize: theme.typography.subtitle1,
          p: theme.spacing(2),
          mt: theme.spacing(1),
        }}
        value={dialogue}
        fullWidth
        onChange={(e) => onChangeDialogue(e)}
        onCompositionEnd={endComposition}
        onCompositionStart={startComposition}
        onKeyDown={(e) => onKeydown(e.key)}
      />
    </Container>
  )
}
