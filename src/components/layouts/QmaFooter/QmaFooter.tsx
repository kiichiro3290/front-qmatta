import { Chat, TagFaces } from '@mui/icons-material'
import { Avatar, Box, IconButton, InputBase } from '@mui/material'
import { ChangeEvent } from 'react'

export type QmaFooterProps = {
  onKeydown: (e: string) => void
  startComposition: () => void
  endComposition: () => void
  onChangeDialogue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClickDialogueButton: () => void
  dialogue: string
}

export const QmaFooter: React.FC<QmaFooterProps> = ({
  dialogue,
  endComposition,
  onChangeDialogue,
  onClickDialogueButton,
  onKeydown,
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '12px', width: '100%' }}>
          <IconButton color='primary' aria-label='dialogue'>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <TagFaces />
            </Avatar>
          </IconButton>
          <IconButton color='primary' aria-label='dialogue' onClick={onClickDialogueButton}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Chat />
            </Avatar>
          </IconButton>
        </Box>
        <InputBase
          placeholder='クマに話しかける...'
          color='primary'
          sx={{ backgroundColor: 'grey.100', borderRadius: '4px', fontSize: '24px', px: '12px', py: '16px' }}
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
