import { Box } from '@mui/material'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'
import { QmaFooter } from '~/components/layouts/QmaFooter/QmaFooter'

export type QmaPagePresenterProps = {
  //
}

export const QmaPagePresenter: React.FC<QmaPagePresenterProps> = () => {
  const qmaSrc = '/quma2.png'
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderLayout />
      <Box sx={{ display: 'flex', mx: 'auto', pt: '96px', px: '24px', width: '1200px' }}>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Box component='img' src={qmaSrc} sx={{ maxWidth: '400px', mx: 'auto' }} />
        </Box>
      </Box>
      <QmaFooter />
    </Box>
  )
}
