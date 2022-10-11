import { Chat, TagFaces } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  InputBase,
  Popover,
  Typography,
} from '@mui/material'
import React, { ChangeEvent } from 'react'
import { lightTheme } from '~/theme'
import numaIcon from 'public/numa.svg'
import sukkiriIcon from 'public/sukkiri.png'

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
    <Box
      sx={{
        bottom: 0,
        left: 0,
        position: 'fixed',
        width: '100%',
      }}
    >
      <Box
        sx={{
          border: '1px solid #dddddd',
          borderRadius: '40px 40px 0px 0px',
          boxShadow: '0px 0px 10px #dddddd',
          margin: '0 auto',
          maxWidth: '560px',
          pb: '32px',
          pt: '16px',
          px: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mb: '12px',
            width: '100%',
          }}
        >
          <IconButton
            color='primary'
            aria-label='dialogue'
            onClick={(e) => handleOpenStampPop(e)}
          >
            <Avatar sx={{ bgcolor: 'icon.pink' }}>
              <TagFaces />
            </Avatar>
          </IconButton>
          <Popover
            open={openStampPop}
            onClose={handleCloseStampPop}
            anchorEl={stampAnchorEl}
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'top',
            }}
            transformOrigin={{
              horizontal: 'left',
              vertical: 'bottom',
            }}
          >
            <Box sx={{ p: '12px' }}>
              <Typography
                sx={{ fontWeight: 'bold', pb: '8px', textAlign: 'center' }}
              >
                スタンプ一覧
              </Typography>
              <Divider sx={{ mb: '12px' }} />
              <IconButton>
                <Avatar src={numaIcon.src} />
              </IconButton>
              <IconButton>
                <Avatar src={sukkiriIcon.src} />
              </IconButton>
            </Box>
          </Popover>

          <IconButton
            color='primary'
            aria-label='dialogue'
            onClick={onClickDialogueButton}
          >
            <Avatar sx={{ bgcolor: 'icon.blue' }}>
              <Chat />
            </Avatar>
          </IconButton>
        </Box>
        <InputBase
          placeholder='コンパイル通らない...😂'
          color='primary'
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
      </Box>
    </Box>
  )
}
