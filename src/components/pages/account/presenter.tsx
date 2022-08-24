import { Box } from '@mui/material'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'

export type AccountPagePresenterProps = {
  //TODO
}

export const AccountPagePresenter: React.FC<AccountPagePresenterProps> = () => {
  return (
    <Box>
      <HeaderLayout />
      <Box sx={{ mt: '64px' }}>マイページ</Box>
    </Box>
  )
}
