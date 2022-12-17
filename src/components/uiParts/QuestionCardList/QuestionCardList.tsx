import { QuestionCard } from '../QuestionCard/QuestionCard'

import { Grid } from '@mui/material'

export const QuestionCardList: React.FC = () => {
  return (
    <Grid spacing={4} container>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
      <Grid item>
        <QuestionCard questionTitle={'質問'} />
      </Grid>
    </Grid>
  )
}
