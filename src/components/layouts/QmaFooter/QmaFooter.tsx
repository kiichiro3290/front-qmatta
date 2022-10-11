import { StampMenu } from '~/components/uiParts/StampMenu/StampMenu'
import { lightTheme } from '~/theme'

import { Chat, TagFaces } from '@mui/icons-material'
import { Avatar, Box, Container, IconButton, InputBase } from '@mui/material'
import { ChangeEvent } from 'react'

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
  return (
    <Container
      maxWidth='sm'
      sx={[
        {
          bottom: 0,
          left: '50%',
          position: 'fixed',
          transform: 'translate(-50%, 0)',
          zIndex: lightTheme.zIndex.modal,
        },
        {
          backgroundColor: lightTheme.palette.background.paper,
          border: `1px solid ${lightTheme.palette.grey[100]}`,
          borderRadius: '40px 40px 0px 0px',
          boxShadow: `0px 0px 10px ${lightTheme.palette.grey[400]}`,
        },
        {
          pb: lightTheme.spacing(4),
          pt: lightTheme.spacing(2),
          px: lightTheme.spacing(3),
        },
      ]}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: lightTheme.spacing(2),
        }}
      >
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
      </Box>

      <InputBase
        color='primary'
        placeholder='コンパイル通らない...😂'
        sx={{
          backgroundColor: lightTheme.palette.grey[200],
          borderRadius: '4px',
          fontSize: lightTheme.typography.subtitle1,
          p: lightTheme.spacing(2),
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
