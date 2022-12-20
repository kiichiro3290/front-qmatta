import { QuestionCard } from '../QuestionCard/QuestionCard'

import { Grid } from '@mui/material'
import { useEffect } from 'react'

type QuestionCardListProps = {
  questions: QuestionInfo[]
}
export const QuestionCardList: React.FC<QuestionCardListProps> = ({
  questions,
}) => {
  useEffect(() => {
    console.log(questions)
  }, [])
  return (
    <>
      <Grid spacing={4} sx={{ width: '100%' }} container>
        {questions.map((question, id) => (
          <Grid key={(question.questionId, id)} item>
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
