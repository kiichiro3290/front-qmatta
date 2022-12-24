import { selectTheme } from '~/store/theme/themeSlice'

import { Favorite } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

type QuestionCardProps = {
  questionTitle: string
  questionId: string
  numLikes: number
  userName: string
  status: string
  priority: string
  categories: string[]
  createdAt: string
}
export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionTitle,
  numLikes,
  userName,
  status,
  priority,
  categories,
  // createdAt,
  questionId,
}) => {
  const theme = useSelector(selectTheme)
  const router = useRouter()

  const routeQuestionPage = () => {
    router.push(`/${router.query.communityId}/questions/${questionId}`)
  }
  return (
    <Card sx={{ position: 'relative' }}>
      <CardActionArea
        sx={{
          height: '240px',
        }}
        onClick={routeQuestionPage}
      >
        <CardContent sx={{ position: 'relative', height: '100%' }}>
          <Box
            component='div'
            sx={{
              backgroundColor: theme.palette.background.default,
              p: theme.spacing(0.7),
              width: '100%',
              borderRadius: theme.spacing(1),
            }}
          >
            {categories && (
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  gap: theme.spacing(1),
                  overflow: 'hidden',
                }}
              >
                {categories.map((category, id) => (
                  <Chip key={id} label={category} />
                ))}
              </Box>
            )}
          </Box>
          <Typography sx={{ my: theme.spacing(2) }} variant='h5'>
            {questionTitle}
          </Typography>
          <Typography>{userName}</Typography>

          <CardActions
            sx={{
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              width: '100%',
              display: 'flex',
              gap: theme.spacing(1),
            }}
            disableSpacing
          >
            <Chip color='success' label={status} size='small' />
            <Chip color='warning' label={priority} size='small' />
          </CardActions>
        </CardContent>
      </CardActionArea>
      {/**カードより上にいいねボタンを配置する */}
      <Box
        component='div'
        sx={{
          display: 'flex',
          position: 'absolute',
          justifyContent: 'flex-end',
          bottom: theme.spacing(1),
          right: theme.spacing(1.5),
        }}
      >
        <IconButton aria-label='add to favorites' sx={{ p: 0 }}>
          <Favorite />
        </IconButton>
        <Typography>{numLikes ? numLikes : 0}</Typography>
      </Box>
    </Card>
  )
}
