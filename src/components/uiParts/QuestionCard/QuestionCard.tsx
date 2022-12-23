import { selectTheme } from '~/store/theme/themeSlice'

// import { Favorite } from '@mui/icons-material'
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  // IconButton,
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
  // userName,
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
    <Card>
      <CardActionArea
        sx={{
          width: { lg: '380px', xs: '100%' },
          height: '240px',
          pb: theme.spacing(1),
        }}
        onClick={routeQuestionPage}
      >
        <CardContent sx={{ position: 'relative', height: '100%' }}>
          <Box
            component='div'
            sx={{
              backgroundColor: theme.palette.background.default,
              p: theme.spacing(0.8),
              borderRadius: theme.spacing(1),
            }}
          >
            {categories && (
              <>
                {categories.map((category, id) => (
                  <Chip key={id} label='category' />
                ))}
              </>
            )}
          </Box>
          <Typography sx={{ mt: theme.spacing(2) }} variant='h5'>
            {questionTitle}
          </Typography>

          <CardActions
            sx={{
              alignItems: 'center',
              position: 'absolute',
              bottom: 0,
              display: 'flex',
              justifyContent: 'space-around',
              width: '100%',
            }}
            disableSpacing
          >
            <Box
              component='div'
              sx={{
                display: 'fflex',
                justifyContent: 'start',
                alignItems: 'center',
                width: '30%',
                gap: 0.5,
              }}
            >
              <Typography>{'未登録'}</Typography>
            </Box>
            <Box component='div' sx={{ display: 'flex', gap: 1, width: '70%' }}>
              <Chip color='success' label={status} size='small' />
              <Chip color='warning' label={priority} size='small' />
              {/**カードより上にいいねボタンを配置する */}
              {/* <IconButton aria-label='add to favorites' sx={{ p: 0 }}>
                <Favorite />
              </IconButton> */}
              <Typography>{numLikes}</Typography>
            </Box>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
