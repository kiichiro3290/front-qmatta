import { SpeakerNotes, TagFaces } from '@mui/icons-material'
import { Avatar, Box, Drawer, IconButton, InputBase } from '@mui/material'
import { useCallback, useState } from 'react'
import { QmaDialogue } from '../QmaDialogue/QmaDialogue'

export type QmaFooterProps = {
  // TODO
}

export const QmaFooter: React.FC<QmaFooterProps> = () => {
  const [isShowDialogue, setIsShowDialogue] = useState(true)
  const [dialogues, setDialogues] = useState<string[]>([])
  const [dialogue, setDialogue] = useState<string>('')
  const [composing, setComposition] = useState(false)
  const startComposition = () => setComposition(true)
  const endComposition = () => setComposition(false)

  const onKeydown = (key: string) => {
    switch (key) {
      case 'Enter':
        if (composing) {
          break
        } else {
          // エンターキー押下時の処理
          const newDialogues = dialogues
          newDialogues.push(dialogue)
          setDialogues(newDialogues)
          setDialogue('')
        }
        break
    }
  }
  const onClickDialogueButton = useCallback(() => {
    setIsShowDialogue((flag) => !flag)
  }, [])
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
            <IconButton color='primary' aria-label='dialogue' onClick={onClickDialogueButton}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <SpeakerNotes />
              </Avatar>
            </IconButton>
          </Box>
          <InputBase
            placeholder='クマに話しかける...'
            color='primary'
            sx={{ borderBottom: '2px solid #ddd', fontSize: '36px', mx: '12px', px: '24px' }}
            fullWidth
            value={dialogue}
            onChange={(e) => {
              setDialogue(e.target.value)
            }}
            onCompositionEnd={endComposition}
            onCompositionStart={startComposition}
            onKeyDown={(e) => onKeydown(e.key)}
          />
        </Box>
      </Box>
      <Drawer variant='persistent' anchor='right' open={isShowDialogue}>
        <QmaDialogue dialogues={dialogues} />
      </Drawer>
    </Box>
  )
}
