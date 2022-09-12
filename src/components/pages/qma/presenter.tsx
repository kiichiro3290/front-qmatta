import { Box } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useEffect } from 'react'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'

import { QmaFooter } from '~/components/layouts/QmaFooter/QmaFooter'
import qmaImg from 'public/quma.png'

export type QmaPagePresenterProps = {
  qmaMessage: string
  isShowChatBaloon: boolean
  onKeydown: (e: string) => void
  startComposition: () => void
  endComposition: () => void
  onChangeDialogue: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  dialogue: string
  dialogues: string[]
}

export const QmaPagePresenter: React.FC<QmaPagePresenterProps> = ({
  dialogue,
  dialogues,
  endComposition,
  isShowChatBaloon,
  onChangeDialogue,
  onKeydown,
  qmaMessage,
  startComposition,
}) => {
  useEffect(() => {
    console.log(qmaMessage)
  }, [])

  return (
    <Box>
      <HeaderLayout />
      <Box
        sx={{
          display: 'flex',
          m: '0 auto',
          maxWidth: '1000px',
          position: 'relative',
          pt: '96px',
          px: '24px',
        }}
      >
        {isShowChatBaloon ? (
          <Box
            sx={{
              '&::before': {
                border: '36px solid transparent',
                borderLeft: '80px solid #dddddd',
                content: '""',
                display: 'block',
                left: '64%',
                position: 'absolute',
                top: '88%',
                transform: 'rotate(50deg)',
              },
              backgroundColor: 'grey.100',
              borderRadius: '4px',
              display: 'block',
              height: '120px',
              left: 0,
              p: '12px',
              position: 'absolute',
              visibility: 'visible',
              width: '280px',
              zIndex: 10,
            }}
          >
            {qmaMessage}
          </Box>
        ) : (
          <Box></Box>
        )}
        <Box
          sx={{
            display: 'flex',
            height: '400px',
            margin: '0 auto',
            width: '400px',
            zIndex: 12,
          }}
        >
          <Image src={qmaImg.src} width='800px' height='800px' alt='qma' />
        </Box>
      </Box>
      <QmaFooter
        onKeydown={onKeydown}
        startComposition={startComposition}
        endComposition={endComposition}
        onChangeDialogue={onChangeDialogue}
        dialogue={dialogue}
        dialogues={dialogues}
      />
    </Box>
  )
}
