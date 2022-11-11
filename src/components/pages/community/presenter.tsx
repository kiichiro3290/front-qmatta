import { MenuTabs } from '~/components/layouts/MenuTabs/Menutabs'
import { InputQuestionPaper } from '~/components/papers/InputQuestionPaper'
import { selectTheme } from '~/store/theme/themeSlice'

import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export type CommunityPagePresenterProps = {
  communityId: string
}

export const CommunityPagePresenter: React.FC<
  CommunityPagePresenterProps
> = () => {
  const theme = useSelector(selectTheme)
  return (
    <Box
      sx={{
        display: 'grid',
        gap: theme.spacing(4),
        gridTemplateColumns: '1fr 1fr',
        height: '100vh',
        p: theme.spacing(4),
      }}
    >
      <Box sx={{ height: '100%' }}>
        <MenuTabs />
      </Box>

      <Box sx={{ height: '100%', width: '100%' }}>
        <Typography sx={{ mb: theme.spacing(2) }} variant='h5'>
          質問する
        </Typography>
        {/** マークダウン方式にしたいな */}
        <InputQuestionPaper />
      </Box>
    </Box>
  )
}
