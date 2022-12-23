import { Box } from '@mui/material'
import Image from 'next/image'

type BearImgContainerProps = {
  imgSrc: string
}

export const BearImgContainer: React.FC<BearImgContainerProps> = ({
  imgSrc,
}) => {
  return (
    <Box
      component='div'
      sx={{
        m: '0 auto',
        mt: { sm: '0px', xs: '96px' },
        width: { sm: '400px', xs: '200px' },
      }}
    >
      <Image alt='qma' height='800px' src={imgSrc} width='800px' />
    </Box>
  )
}
