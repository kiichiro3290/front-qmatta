import { QuestionCard } from '../QuestionCard/QuestionCard'

import { Grid } from '@mui/material'

type QuestionCardListProps = {
  questions: QuestionInfo[]
}
export const QuestionCardList: React.FC<QuestionCardListProps> = ({
  questions,
}) => {
  return (
    <>
      <Grid spacing={4} container>
        {questions.map((question, id) => (
          <Grid key={(question.questionId, id)} sm={6} xs={12} item>
            <QuestionCard
              categories={question.category}
              createdAt={question.createdAt}
              numLikes={question.numLikis}
              priority={question.priority}
              questionId={question.questionId}
              questionTitle={question.title}
              status={question.status}
              userName={question.questioner}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
