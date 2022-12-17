import bear2Img from 'public/bear2.png'
import qmattaBoard from 'public/qmatta-board.png'
import bearImg from 'public/quma.png'
import { QmaDialogueDrawer } from '~/components/layouts/QmaDialogueDrawer/QmaDialogueDrawer'
import { QmaFooter } from '~/components/layouts/QmaFooter/QmaFooter'
import { BearChatBalloon } from '~/components/uiParts/BearChatBalloon/BearChatBalloon'
import { BearImgContainer } from '~/components/uiParts/BearImgContainer/BearImgContainer'
import { selectTheme } from '~/store/theme/themeSlice'

import { ChevronLeftRounded } from '@mui/icons-material'
import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { ChangeEvent, Fragment, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

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
  messageHistory: MessageHistory
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
  const theme = useSelector(selectTheme)

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
    <Fragment>
      <Box
        component='div'
        sx={{
          position: 'absolute',
          top: theme.spacing(4),
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Image alt='qmatta' height={100} src={qmattaBoard} width={320} />
      </Box>

      <Drawer anchor='right' open={isShowDialogue} variant='persistent'>
        <Box
          component='div'
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'flex-start',
            mt: theme.spacing(6),
            px: theme.spacing(3),
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
        <QmaDialogueDrawer
          dialogues={dialogues}
          messageHistory={messageHistory}
        />
      </Drawer>

      <Container
        sx={{
          display: 'flex',
          m: '0 auto',
          maxWidth: 'lg',
          position: 'relative',
          pt: theme.spacing(16),
          px: theme.spacing(3),
        }}
      >
        {isShowChatBaloon ? (
          <BearChatBalloon qmaMessage={qmaMessage} />
        ) : (
          <Fragment />
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
    </Fragment>
  )
}
