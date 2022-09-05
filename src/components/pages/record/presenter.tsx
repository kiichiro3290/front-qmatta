import { Box } from '@mui/material'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'
import { MenuTabs } from '~/components/layouts/MenuTabs/Menutabs'

export type RecordPagePresenterProps = {
  // TODO
}

export const RecordPagePresenter: React.FC<RecordPagePresenterProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderLayout />
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ pt: '96px', px: '24px', width: '100%' }}>
          <MenuTabs />
        </Box>
      </Box>
    </Box>
  )
}
