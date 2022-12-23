import { QmaDialoguePaper } from '~/components/layouts/QmaDialoguePaper/QmaDialoguePaper'
import { InputQuestionPaper } from '~/components/papers/InputQuestionPaper/InputQuestionPaper'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type QuestionPostPagePresenterProps = {
  messageHistory: MessageHistory
  categoryList: Category[]
  statusList: QuestionStatus[]
  priorityList: Priority[]
  communityId: string
}

export const QuestionPostPagePresenter: React.FC<
  QuestionPostPagePresenterProps
> = ({
  messageHistory,
  categoryList,
  statusList,
  priorityList,
  communityId,
}) => {
  const theme = useSelector(selectTheme)

  return (
    <>
      <Box
        component='div'
        sx={{
          display: 'grid',
          gap: theme.spacing(4),
          gridTemplateColumns: '1fr 1fr',
          p: theme.spacing(4),
        }}
      >
        <Box component='div' sx={{ height: '100%' }}>
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            くま記録
          </Typography>
          <QmaDialoguePaper messageHistory={messageHistory} />
        </Box>

        <Box component='div' sx={{ height: '100%', width: '100%' }}>
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            質問する
          </Typography>

          <InputQuestionPaper
            categoryList={categoryList}
            communityId={communityId}
            priorityList={priorityList}
            statusList={statusList}
          />
        </Box>
      </Box>
    </>
  )
}
