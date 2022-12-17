import { QmaDialoguePaper } from '~/components/layouts/QmaDialoguePaper/QmaDialoguePaper'
import { InputQuestionPaper } from '~/components/papers/InputQuestionPaper/InputQuestionPaper'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
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

  return (
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
    </Box>
  )
}
