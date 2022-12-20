import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export type CommunityPagePresenterProps = {
  communityId?: string
}

export const CommunityPagePresenter: React.FC<
  CommunityPagePresenterProps
> = () => {
  const theme = useSelector(selectTheme)
  // TODO: レスポンシブ対応

  return (
    <>
      <Box component='div' sx={{ mt: theme.spacing(13), ml: theme.spacing(2) }}>
        <Container maxWidth='lg'>
          <Typography sx={{ mt: theme.spacing(2) }} variant='h5'>
            HOME TODO: コミュニティユーザの一覧
          </Typography>
        </Container>
      </Box>
    </>
  )
}
