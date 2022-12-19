import { QuestionCard } from '../QuestionCard/QuestionCard'

import { Grid } from '@mui/material'

type QuestionCardListProps = {
  questions: QuestionInfo[]
}
export const QuestionCardList: React.FC<QuestionCardListProps> = ({
  questions,
}) => {
  return (
    <Grid spacing={4} sx={{ width: '100%' }} container>
      {questions.map((question, id) => (
        <Grid key={(question.questionId, id)} item>
          <QuestionCard
            categories={question.category}
            numLikes={question.numLikis}
            priority={question.priority}
            questionTitle={question.title}
            status={question.status}
            userName={question.questioner}
          />
        </Grid>
      ))}
    </Grid>
  )
}
