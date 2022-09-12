import { ChevronLeftRounded } from '@mui/icons-material'
import { Box, Drawer, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'

import { QmaDialogue } from '~/components/layouts/QmaDialogue/QmaDialogue'
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

  const [isShowDialogue, setIsShowDialogue] = useState<boolean>(true)

  const onClickDialogueButton = useCallback(() => {
    setIsShowDialogue((flag) => !flag)
  }, [])

  return (
    <Box>
      <HeaderLayout />
      {/* 検討：Dialogueモーダルを開閉するトグルボタンをどこに配置するか */}
      {/* <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'grey.100',
          border: 'solid 2px #ddd',
          borderRadius: '8px 0px 0px 8px',
          boxShadow: '0px 0px 2px',
          display: 'flex',
          height: '40px',
          justifyContent: 'flex-start',
          position: 'absolute',
          right: '0',
          top: '80px',
          width: '36px',
        }}
      >
        <IconButton size='small' aria-label='open-dialogue-modal' onClick={onClickDialogueButton}>
          <ChevronLeftRounded />
        </IconButton>
      </Box> */}
      <Drawer variant='persistent' anchor='right' open={isShowDialogue}>
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-start', mt: '80px' }}>
          <IconButton onClick={onClickDialogueButton}>
            <ChevronLeftRounded />
          </IconButton>
          <Typography component='h1' variant='subtitle1' sx={{ fontSize: '24px', textAlign: 'center' }}>
            会話ログ
          </Typography>
        </Box>
        <QmaDialogue dialogues={dialogues} />
      </Drawer>
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
                borderLeft: '80px solid #e5e5e5',
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
        onClickDialogueButton={onClickDialogueButton}
      />
    </Box>
  )
}
