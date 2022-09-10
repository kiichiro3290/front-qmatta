import { Box } from '@mui/material'
import Image from 'next/image'
import { HeaderLayout } from '~/components/layouts/HeaderLayout/HeaderLayout'
import { QmaFooter } from '~/components/layouts/QmaFooter/QmaFooter'
import qmaImg from 'public/quma2.png'

export type QmaPagePresenterProps = {
  //
}

export const QmaPagePresenter: React.FC<QmaPagePresenterProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HeaderLayout />
      <Box sx={{ display: 'flex', mx: 'auto', pt: '96px', px: '24px' }}>
        <Box sx={{ display: 'flex', height: '400px', margin: '0 auto', width: '400px' }}>
          <Image src={qmaImg.src} width='900px' height='900px' alt='qma' />
        </Box>
      </Box>
      <QmaFooter />
    </Box>
  )
}
