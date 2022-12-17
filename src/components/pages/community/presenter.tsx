import { useCommunityMenu } from '~/components/hooks/useCommunityMenu'
import { QmaDialoguePaper } from '~/components/layouts/QmaDialoguePaper/QmaDialoguePaper'
import { InputQuestionPaper } from '~/components/papers/InputQuestionPaper/InputQuestionPaper'
import { CommunityMenuItemButton } from '~/components/uiParts/CommunityMenuItemButton/CommunityMenuItemButton'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'

export type CommunityPagePresenterProps = {
  communityId: string
  questions: Question[]
  messageHistory: MessageHistory
}

export const CommunityPagePresenter: React.FC<CommunityPagePresenterProps> = ({
  // questions,
  messageHistory,
}) => {
  const theme = useSelector(selectTheme)

  // 今どのページなのかを受け取るhooksを作る
  const {
    isShowEveryoneStatus,
    isShowPostQuestion,
    isShowQuestionList,
    showEveryoneStatus,
    showPostQuestion,
    showQuestionList,
  } = useCommunityMenu()

  return (
    <Box component='div'>
      <Box component='div' sx={{ mt: theme.spacing(13), ml: theme.spacing(2) }}>
        <CommunityMenuItemButton
          menuTitle={'質問を投稿する'}
          onClickMenuButton={showPostQuestion}
        />
        <CommunityMenuItemButton
          menuTitle={'質問一覧'}
          onClickMenuButton={showQuestionList}
        />
        <CommunityMenuItemButton
          menuTitle={'みんなの状況'}
          onClickMenuButton={showEveryoneStatus}
        />
      </Box>

      <Box
        component='div'
        sx={{
          display: 'grid',
          gap: theme.spacing(4),
          gridTemplateColumns: '1fr 1fr',
          height: '100vh',
          p: theme.spacing(4),
        }}
      >
        {isShowEveryoneStatus && <div>みんなの状況</div>}
        {isShowQuestionList && <div>質問一覧</div>}
        {isShowPostQuestion && (
          <Fragment>
            <Box component='div' sx={{ height: '100%' }}>
              <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
                くま記録
              </Typography>
              <QmaDialoguePaper
                // TODO: クマページで入力したメッセージを redux で管理する
                dialogues={['おはよう', 'こんにちは', 'こんばんは']}
                messageHistory={messageHistory}
              />
            </Box>

            <Box component='div' sx={{ height: '100%', width: '100%' }}>
              <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
                質問する
              </Typography>

              <InputQuestionPaper />
            </Box>
          </Fragment>
        )}
      </Box>
    </Box>
  )
}
