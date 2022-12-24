import { likePostedQuestion } from '~/api/client/back/community'
import { selectTheme } from '~/store/theme/themeSlice'

import { Favorite } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
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
  questionerIcon: string
}
export const QuestionCard: React.FC<QuestionCardProps> = ({
  questionTitle,
  numLikes,
  userName,
  status,
  priority,
  categories,
  createdAt,
  questionerIcon,
  questionId,
}) => {
  const theme = useSelector(selectTheme)
  const router = useRouter()

  const routeQuestionPage = () => {
    router.push(`/${router.query.communityId}/questions/${questionId}`)
  }

  // いいねをつけたり，外したりする
  // TODO: 自分がいいねしたか，いいねしてないかを判断する機能
  const onClickFabButton = async () => {
    await likePostedQuestion(questionId, true)
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
          <Stack spacing={2} sx={{ mt: theme.spacing(1) }}>
            <Stack>
              <Typography variant='h5'>{questionTitle}</Typography>
              <Typography variant='caption'>
                {new Date(createdAt).toLocaleDateString('ja-JP').toString()}
              </Typography>
            </Stack>
            <Box
              component='div'
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing(1),
              }}
            >
              <Avatar src={'data:image/png;base64, ' + questionerIcon} />
              <Typography>{userName}</Typography>
            </Box>
          </Stack>

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
          gap: theme.spacing(0.2),
          alignItems: 'center',
        }}
      >
        <IconButton onClick={onClickFabButton}>
          <Favorite />
        </IconButton>
        <Typography>{numLikes}</Typography>
      </Box>
    </Card>
  )
}
