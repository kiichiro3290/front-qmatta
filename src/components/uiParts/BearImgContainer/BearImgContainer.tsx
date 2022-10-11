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
      sx={{
        m: '0 auto',
        mt: { sm: '0px', xs: '96px' },
        width: { sm: '400px', xs: '200px' },
      }}
    >
      <Image src={imgSrc} width='800px' height='800px' alt='qma' />
    </Box>
  )
}
