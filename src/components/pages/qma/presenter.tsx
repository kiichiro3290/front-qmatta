import bear2Img from 'public/bear2.png'
import bearImg from 'public/quma.png'
import { QmaDialogue } from '~/components/layouts/QmaDialogue/QmaDialogue'
import { QmaFooter } from '~/components/layouts/QmaFooter/QmaFooter'
import { BearChatBalloon } from '~/components/uiParts/BearChatBalloon/BearChatBalloon'
import { BearImgContainer } from '~/components/uiParts/BearImgContainer/BearImgContainer'
import { lightTheme } from '~/theme'

import { ChevronLeftRounded } from '@mui/icons-material'
import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material'
import { ChangeEvent, useCallback, useState } from 'react'

export type QmaPagePresenterProps = {
  qmaMessage: string
  isShowChatBaloon: boolean
  onKeydown: (e: string) => void
  startComposition: () => void
  endComposition: () => void
  onChangeDialogue: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  dialogue: string
  dialogues: string[]
  messageHistory: string[]
  isOpenBearMouth: boolean
}

export const QmaPagePresenter: React.FC<QmaPagePresenterProps> = ({
  dialogue,
  dialogues,
  endComposition,
  isOpenBearMouth,
  isShowChatBaloon,
  messageHistory,
  onChangeDialogue,
  onKeydown,
  qmaMessage,
  startComposition,
}) => {
  const [isShowDialogue, setIsShowDialogue] = useState<boolean>(false)
  const [stampAnchorEl, setStampAnchorEl] = useState<HTMLButtonElement | null>(
    null
  )

  const onClickDialogueButton = useCallback(() => {
    setIsShowDialogue((flag) => !flag)
  }, [])

  const handleCloseStampPop = useCallback(() => {
    setStampAnchorEl(null)
  }, [])
  const handleOpenStampPop = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setStampAnchorEl(event.currentTarget)
    },
    []
  )

  return (
    <Box>
      <Drawer anchor='right' open={isShowDialogue} variant='persistent'>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-start',
            mt: '80px',
          }}
        >
          <IconButton onClick={onClickDialogueButton}>
            <ChevronLeftRounded />
          </IconButton>

          <Typography component='h1' sx={{ textAlign: 'center' }} variant='h5'>
            会話ログ
          </Typography>

          <Divider />
        </Box>
        <QmaDialogue dialogues={dialogues} messageHistory={messageHistory} />
      </Drawer>

      <Container
        sx={{
          display: 'flex',
          m: '0 auto',
          maxWidth: 'lg',
          position: 'relative',
          pt: lightTheme.spacing(12),
          px: lightTheme.spacing(3),
        }}
      >
        {isShowChatBaloon ? (
          <BearChatBalloon qmaMessage={qmaMessage} />
        ) : (
          <Box></Box>
        )}

        {/** クマの画像部分 */}
        {isOpenBearMouth ? (
          <BearImgContainer imgSrc={bear2Img.src} />
        ) : (
          <BearImgContainer imgSrc={bearImg.src} />
        )}
      </Container>

      <QmaFooter
        dialogue={dialogue}
        endComposition={endComposition}
        handleCloseStampPop={handleCloseStampPop}
        handleOpenStampPop={handleOpenStampPop}
        openStampPop={Boolean(stampAnchorEl)}
        stampAnchorEl={stampAnchorEl}
        startComposition={startComposition}
        onChangeDialogue={onChangeDialogue}
        onClickDialogueButton={onClickDialogueButton}
        onKeydown={onKeydown}
      />
    </Box>
  )
}
