import { TagFaces } from '@mui/icons-material'
import { Avatar, Box, IconButton, InputBase } from '@mui/material'
import { ChangeEvent } from 'react'

export type QmaFooterProps = {
  onKeydown: (e: string) => void
  startComposition: () => void
  endComposition: () => void
  onChangeDialogue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  dialogue: string
  dialogues: string[]
}

export const QmaFooter: React.FC<QmaFooterProps> = ({
  dialogue,
  endComposition,
  onChangeDialogue,
  onKeydown,
  startComposition,
}) => {
  return (
    <Box
      sx={{
        bottom: 0,
        boxShadow: '0px 2px 10px #5e5e5e',
        left: 0,
        position: 'fixed',
        py: '28px',
        width: '100%',
      }}
    >
      <Box>
        <Box sx={{ margin: '0 auto', maxWidth: '560px' }}>
          <Box sx={{ display: 'flex' }}>
            <IconButton color='primary' aria-label='dialogue'>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <TagFaces />
              </Avatar>
            </IconButton>
          </Box>
          <InputBase
            placeholder='クマに話しかける...'
            color='primary'
            sx={{ borderBottom: '2px solid #ddd', fontSize: '36px', mx: '12px', px: '24px' }}
            fullWidth
            value={dialogue}
            onChange={(e) => onChangeDialogue(e)}
            onCompositionEnd={endComposition}
            onCompositionStart={startComposition}
            onKeyDown={(e) => onKeydown(e.key)}
          />
        </Box>
      </Box>
    </Box>
  )
}
