import { Card, CardContent, Typography } from '@mui/material'

type QuestionCardProps = {
  questionTitle: string
}
export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionTitle,
}) => {
  return (
    <Card sx={{ width: '400px', height: '240px' }}>
      <CardContent>
        <Typography>{questionTitle}</Typography>
      </CardContent>
    </Card>
  )
}
