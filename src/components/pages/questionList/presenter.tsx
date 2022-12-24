import { QuestionCardList } from '~/components/uiParts/QuestionCardList/QuestionCardList'
import { selectTheme } from '~/store/theme/themeSlice'

import { Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

type QuestionListPagePresenterProps = {
  questions: QuestionInfo[]
}

export const QuestionListPagePresenter: React.FC<
  QuestionListPagePresenterProps
> = ({ questions }) => {
  const theme = useSelector(selectTheme)

  return (
    <>
      {/** 質問一覧ページ */}
      <Container maxWidth='md'>
        <Typography sx={{ mb: theme.spacing(6) }} variant='h5'>
          質問一覧
        </Typography>
        <QuestionCardList questions={questions} />
      </Container>
    </>
  )
}
