import { selectTheme } from '~/store/theme/themeSlice'

import { ImageOutlined } from '@mui/icons-material'
import { Avatar, Box, Chip, Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export type CommunityPagePresenterProps = {
  communityId?: string
  users: UserList
}

export const CommunityPagePresenter: React.FC<CommunityPagePresenterProps> = ({
  users,
}) => {
  const theme = useSelector(selectTheme)
  // TODO: レスポンシブ対応

  return (
    <>
      <Box component='div' sx={{ ml: theme.spacing(2) }}>
        <Container maxWidth='sm'>
          <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
            HOME
          </Typography>
          <Box
            component='div'
            sx={{
              gap: theme.spacing(2),
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {users &&
              users.map((user, id) => (
                <Box
                  key={id}
                  component='div'
                  sx={{
                    background: theme.palette.background.paper,
                    borderRadius: theme.spacing(0.5),
                    display: 'flex',
                    p: theme.spacing(2),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: theme.shadows[1],
                  }}
                >
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: theme.spacing(2),
                    }}
                  >
                    <Avatar src={'data:image/png;base64,' + user.icon}>
                      <ImageOutlined />
                    </Avatar>
                    <Typography variant='h6'>{user.userName}</Typography>
                  </Box>
                  <Chip color='primary' label={user.status} />
                </Box>
              ))}
          </Box>
        </Container>
      </Box>
    </>
  )
}
