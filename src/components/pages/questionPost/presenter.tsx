import { QmaDialoguePaper } from '~/components/layouts/QmaDialoguePaper/QmaDialoguePaper'
import { InputQuestionPaper } from '~/components/papers/InputQuestionPaper/InputQuestionPaper'
import { selectTheme } from '~/store/theme/themeSlice'

import { Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type QuestionPostPagePresenterProps = {
  chatHistory: ChatHistory
  categoryList: Category[]
  statusList: QuestionStatus[]
  priorityList: Priority[]
  communityId: string
}

export const QuestionPostPagePresenter: React.FC<
  QuestionPostPagePresenterProps
> = ({ chatHistory, categoryList, statusList, priorityList, communityId }) => {
  const theme = useSelector(selectTheme)

  return (
    <>
      <Grid spacing={2} sx={{ px: theme.spacing(3) }} container>
        <Grid sm={6} sx={{ height: '100%' }} xs={12} item>
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            くま記録
          </Typography>
          <QmaDialoguePaper chatHistory={chatHistory} />
        </Grid>

        <Grid sm={6} sx={{ height: '100%', width: '100%' }} xs={12} item>
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            質問する
          </Typography>

          <InputQuestionPaper
            categoryList={categoryList}
            communityId={communityId}
            priorityList={priorityList}
            statusList={statusList}
          />
        </Grid>
      </Grid>
    </>
  )
}
