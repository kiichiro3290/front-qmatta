import { getBaseLayout } from '~/components/layouts/base'
import { RecordPage } from '~/components/pages/record'
import { NextPageWithLayout } from '~/types/next'

const Record: NextPageWithLayout = () => {
  return (
    <>
      <RecordPage />
    </>
  )
}

Record.getLayout = getBaseLayout

export default Record
