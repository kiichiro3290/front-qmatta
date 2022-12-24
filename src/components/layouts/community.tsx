import { CommunityMenuItemButton } from '../uiParts/CommunityMenuItemButton/CommunityMenuItemButton'

import { selectTheme } from '~/store/theme/themeSlice'

import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export const CommunityMenu: React.FC = () => {
  const router = useRouter()
  const communityId = router.query.communityId

  const theme = useSelector(selectTheme)
  const routeCommunityHome = () => {
    router.push(`/${communityId}`)
  }
  const routeQuestionList = () => {
    router.push(`/${communityId}/questions`)
  }

  const routeQuestionPost = () => {
    router.push(`/${communityId}/post`)
  }

  return (
    <>
      <Box component='div' sx={{ mt: theme.spacing(13), ml: theme.spacing(2) }}>
        <CommunityMenuItemButton
          menuTitle={'HOME'}
          onClickMenuButton={routeCommunityHome}
        />
        <CommunityMenuItemButton
          menuTitle={'質問を投稿する'}
          onClickMenuButton={routeQuestionPost}
        />
        <CommunityMenuItemButton
          menuTitle={'質問一覧'}
          onClickMenuButton={routeQuestionList}
        />
      </Box>
    </>
  )
}
