import { getBaseLayout } from '~/components/layouts/base'
import { Qma3DPage } from '~/components/pages/qma3D'
import { NextPageWithLayout } from '~/types/next'

const Qma3D: NextPageWithLayout = () => {
  return (
    <>
      <Qma3DPage />
    </>
  )
}

Qma3D.getLayout = getBaseLayout

export default Qma3D
